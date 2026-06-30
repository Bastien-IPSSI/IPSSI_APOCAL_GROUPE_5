# Perturbation P2 — Latence LLM trop élevée

> **Symptôme** : génération de quiz à ~45 s en prod (`llama3.1:8b`), retour
> bêta-testeur négatif. Objectif : mesurer des modèles alternatifs **avant** de
> décider d'un changement. **Aucun modèle de prod n'a été modifié** à ce stade.

## 📂 Livrables J2

| Critère | Statut | Livrable |
|---|---|---|
| CA-J2-1 — benchmark ≥ 3 modèles chiffrés (p50/p95, qualité /5, RAM/disque/GPU) | ✅ | [`RESULTATS-bruts.md`](./RESULTATS-bruts.md) + tableaux ci-dessous |
| CA-J2-2 — protocole écrit (runs / cours / machine) | ✅ | [`PROTOCOLE.md`](./PROTOCOLE.md) |
| CA-J2-3 — ADR 4 sections (≤ 1 page) | ✅ | [`ADR-001-choix-modele-llm.md`](./ADR-001-choix-modele-llm.md) |
| CA-J2-4 — décision argumentée | ✅ | [`ADR-001`](./ADR-001-choix-modele-llm.md) (section *Justification*) |
| CA-J2-5 — Sprint Backlog mis à jour (capture, stories avant/après) | ⏳ équipe | *à ajouter par l'équipe* |
| CA-J2-6 — génération ≤ 15 s mesurée après action | ⚠️ non tenu en l'état | [`ADR-001`](./ADR-001-choix-modele-llm.md) (GPU natif / Groq) |
| CA-J2-7 — code commité **ou** justification de non-action | ✅ justifié | [`ADR-001`](./ADR-001-choix-modele-llm.md) (section *Conséquences*) |

> ⚠️ **Qualité /5** : 1 testeur sur ≥ 3 rempli (cf. `RESULTATS-bruts.md`) — 2 retours
> humains restent à ajouter.

## Méthode

Protocole complet (variable testée, machine, repro) → [`PROTOCOLE.md`](./PROTOCOLE.md). En résumé :

- Appel **direct** à Ollama `/api/generate`, avec le **vrai prompt de prod**
  (`quiz_prompt.build_full_prompt`) et les mêmes options
  (`stream=false`, `format=json`, `temperature=0.4`) → latence pure, hors auth/DB.
- 3 modèles × 5 runs, même texte GRC (`test_text_grc.txt`, 165 mots).
- Parse/validation avec le **même code que la prod** (`parse_and_validate_quiz`,
  qui exige exactement 10 questions × 4 options).
- Mesures sur le conteneur Ollama (`apocalipssi-2026-ollama`, CPU).

## Résultats (p50 / p95)

| Modèle | p50 (méd.) | p95 | min | max | Quiz **valides** |
|---|---|---|---|---|---|
| `llama3.1:8b` *(actuel)* | **140.8 s** | 182.2 s | 110.0 s | 188.8 s | **2/5** |
| `llama3.2:3b` | **73.7 s** | 82.5 s | 64.9 s | 82.8 s | **3/5** |
| `phi3:mini` | 69.9 s* | 94.3 s* | 37.6 s | 95.7 s | **0/5** (+1 crash HTTP 500) |

\* `phi3:mini` : stats de latence calculées sur les runs sans erreur HTTP ; le
run 3 a renvoyé un **500** d'Ollama (0.6 s, exclu). Détail run par run dans
[`RESULTATS-bruts.md`](./RESULTATS-bruts.md) ; questions de chaque run dans
`backend/benchmarks/p2-latence/results/<modèle>/run_NN.json`.

> 📌 **« Quiz valides » ≠ « a répondu ».** Les modèles renvoient *toujours* une
> réponse (`raw_response` rempli, souvent avec des questions lisibles). Un run
> n'est compté que s'il respecte le format strict **10 questions × 4 options** :
> `0/5` signifie « 0 réponse au bon format », pas « 0 réponse ».

## Lecture critique — deux problèmes, pas un seul

1. **Latence (le symptôme).** Sur ce CPU, `llama3.1:8b` est à **p50 ≈ 141 s**
   (bien au-delà des 45 s annoncés — à recontextualiser selon la machine de
   prod et l'état « à chaud » du modèle). `llama3.2:3b` divise la latence
   par ~2 (p50 ≈ 74 s). `phi3:mini` n'est **pas** plus rapide que le 3B.

2. **Qualité/fiabilité (révélé par le benchmark).** Même le modèle **actuel**
   ne produit un quiz valide que **2 fois sur 5** sur ce texte : les petits
   modèles respectent mal la consigne « exactement 10 questions × 4 options ».
   `phi3:mini` est **inexploitable** ici (0/5 + un crash serveur).

## Décision retenue

➡️ **Bascule sur `llama3.2:3b`** (latence ÷2, meilleure fiabilité des trois,
souveraineté préservée). `phi3:mini` écarté (0/5 + crash). Détail et trade-offs
dans l'[**ADR-001**](./ADR-001-choix-modele-llm.md).

⚠️ **L'objectif ≤ 15 s (CA-J2-6) n'est pas tenu sur cette machine** : Docker
Desktop macOS n'expose pas le GPU Metal → exécution CPU pure. Atteindre 15 s
exige un **Ollama natif (Metal)** ou une **bascule Groq** (données hors UE) →
action de suivi documentée dans l'ADR (Conséquences), à arbitrer avec le sponsor.

> Note : `.env.prod.example` est déjà configuré sur **Groq** (`llama-3.3-70b`) —
> la prod « cible » n'est peut-être pas censée tourner sur Ollama. À clarifier.

Recommandation à débattre : **B + C** combinés (gain immédiat de latence + on
fiabilise la sortie), ou **D** si la latence « quelques secondes » est exigée et
que la sortie des données vers le cloud est acceptable côté RGPD.

## Outil ajouté en parallèle — sélecteur de modèle (test manuel)

Pour tester les modèles **à la main** depuis le site (page « Créer un nouveau
quiz ») : un menu déroulant liste les modèles Ollama installés et permet d'en
choisir un pour une génération donnée, **sans modifier la config par défaut**.

- `GET /api/llm/models/` — liste les modèles installés + le modèle actif.
- `POST /api/llm/generate-quiz/` accepte un champ optionnel `model` (validé
  contre les modèles réellement installés ; refusé hors backend Ollama).

> ⚠️ **Statut : décision en attente.** Le modèle de prod (`OLLAMA_MODEL` dans
> `.env`) reste `llama3.1:8b`. Aucun changement ne sera fait sans validation.
