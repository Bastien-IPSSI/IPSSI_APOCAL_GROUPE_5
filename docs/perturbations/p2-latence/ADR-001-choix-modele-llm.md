# ADR-001 — Choix du modèle LLM pour la génération de QCM

**Statut :** ✅ Acceptée · **Date :** 30 juin 2026 · **Perturbation :** J2 (latence)
**Décideurs :** Équipe Groupe 5 · **Réfs :** [`PROTOCOLE.md`](./PROTOCOLE.md) · [`RESULTATS-bruts.md`](./RESULTATS-bruts.md)

## Contexte

Génération de QCM par un LLM Ollama **local, sur CPU** (souveraineté + zéro coût).
Modèle actuel : `llama3.1:8b`. Retour bêta-testeur : *« 45 s d'attente, j'ai cru
le site cassé »*. Le sponsor veut un temps acceptable. Le benchmark (3 modèles ×
5 runs, même cours CRM, Apple M3 Pro / Docker CPU) révèle **deux** problèmes :
**latence** (8B à p50 ≈ 141 s ici) **et fiabilité** (le 8B ne produit un quiz
valide 10×4 que **2 fois sur 5**).

## Options envisagées

| Option | Latence p50 | Quiz valides | Qualité /5 | RAM | Souveraineté |
|---|---|---|---|---|---|
| **A.** `llama3.1:8b` (statu quo) | ❌ ~141 s | ⚠️ 2/5 | 4/5 | ~6–8 Go | ✅ UE/local |
| **B.** `llama3.2:3b` | ✅ ~74 s (÷2) | ⚠️ 3/5 | 3/5 | ~3–4 Go | ✅ UE/local |
| **C.** `phi3:mini` | ~70 s | ❌ 0/5 (+crash) | 2/5 | ~3–4 Go | ✅ UE/local |
| **D.** Groq cloud | ✅✅ qq s | ✅✅ | n/a | — | ⚠️ hors UE |

## Décision

**Bascule sur `llama3.2:3b` comme modèle local par défaut** (`OLLAMA_MODEL`).

## Justification (≠ « on prend le plus rapide »)

- **Le plus rapide est écarté** : `phi3:mini` est rapide mais **0/5 valide + un
  crash** → un service rapide et toujours faux n'a aucune valeur.
- `llama3.2:3b` est le **meilleur compromis local** : latence **÷2**, **meilleure
  fiabilité** des trois (3/5 > 2/5), empreinte RAM réduite, et **données souveraines**.
- **L'objectif ≤ 15 s n'est PAS atteignable ici** : Docker Desktop sur macOS
  n'expose pas le GPU Metal → exécution CPU pure. Le passer exige soit **Ollama
  natif (Metal)**, soit **Groq** (option D, mais données hors UE) → tranché hors
  de ce ticket pour préserver la souveraineté en dev (cf. Conséquences).

## Conséquences

- **+** Latence ÷2 immédiate, RAM ÷2, souveraineté préservée, fiabilité accrue.
- **+** Le durcissement prompt/retry (J3/J4) profitera à tous les fournisseurs.
- **−** 3/5 reste imparfait → l'UI doit afficher un message clair + « relancer ».
- **−** ≤ 15 s non tenu sur cette machine : **action de suivi** = benchmark Ollama
  natif (Metal) et/ou bascule Groq documentée, à arbitrer avec le sponsor.
- **Mise en œuvre :** `OLLAMA_MODEL=llama3.2:3b` + `ollama pull llama3.2:3b` ;
  vérif `GET /api/llm/ping/`.
