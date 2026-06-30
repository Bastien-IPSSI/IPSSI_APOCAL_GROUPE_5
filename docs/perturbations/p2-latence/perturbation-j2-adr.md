# ADR-001 · Choix du modèle LLM : Llama 3.1 8B → Llama 3.2 3B

| | |
|---|---|
| **Statut** | ✅ Accepté |
| **Date** | 2026-06-30 (perturbation J2) |
| **Auteurs** | Équipe Groupe 5 |
| **Version** | v1.0 |
| **Supersedes** | Aucun (1ʳᵉ décision de modèle formalisée) |

## Contexte

Suite à un test bêta (étudiant Master 2), le sponsor signale une latence de génération
de quiz inacceptable : *« j'ai attendu 45 secondes… j'ai cru que le site était cassé. »*

Benchmark de l'équipe (**réalisé backend/benchmarks/p2-latence**) — **3 modèles × 5 runs**, même cours de référence, même machine :

- **Llama 3.1 8B (actuel)** : p50 = **140,8 s**, p95 = **182,2 s**.
- Problème au-delà de la latence : même le 8B ne produit un quiz au **format strictement
  valide (10 questions × 4 options) que 2 fois sur 5**.

**Contraintes :** stack **Ollama local imposée** (souveraineté des données / RGPD, pas
d'API cloud par défaut) ; décision exigée par le sponsor **avant ce soir**.

**Si on ne décide rien :** Release 1 risque d'être rejetée en démo, adoption B2B
compromise (classe entière attendant > 2 min/quiz), désavantage concurrentiel.

## Options envisagées

| Option | Latence p50 | Format valide | Qualité | Verdict |
|---|---|---|---|---|
| **A. Statu quo** (Llama 3.1 8B) | 140,8 s | 2/5 | 4/5 | ❌ Cause directe du signalement |
| **B. Llama 3.2 3B** | 73,7 s | 3/5 | 3/5 | ✅ Meilleur compromis local |
| **C. Phi-3-mini (3,8B)** | 69,9 s | **0/5** + crash HTTP 500 | 2/5 | ❌ Inexploitable en l'état |
| **D. Groq (cloud)** | quelques s | excellente | — | ❌ Données hors UE, rompt la souveraineté |

## Décision

> **Option B : bascule sur `llama3.2:3b` comme modèle local par défaut** (variable
> d'environnement `OLLAMA_MODEL`), avec retour rapide possible vers `llama3.1:8b`.

**Pourquoi :** la plus rapide (C) est écartée car 0/5 valide + crash — un service rapide
et toujours faux n'a aucune valeur. La D (Groq) romprait la promesse de souveraineté sans
validation sponsor. Le statu quo (A) est la cause du problème. **B** offre le meilleur
compromis local : latence ÷ ~2, **meilleure fiabilité de format des trois** (3/5), RAM
réduite, données souveraines.

**Mitigations des inconvénients :**
- `OLLAMA_MODEL` configurable → retour 8B immédiat si la qualité prod déçoit.
- Validation post-LLM existante (`parse_and_validate_quiz`, exige 10×4) + UI avec message
  d'erreur clair et bouton **« relancer »** (3/5 reste imparfait).
- Durcissement du prompt + retry automatique (J3/J4) → profitera à tous les modèles.

## Conséquences

**Positives**
- ✅ Latence p50 : 140,8 s → **73,7 s** (~‑48 %) ; p95 : 182,2 s → **82,5 s** (~‑55 %).
- ✅ RAM ~3‑4 Go (vs 6‑8 Go) ; disque ~2,0 Go (vs 4,7 Go).
- ✅ Fiabilité de format : 3/5 (vs 2/5).
- ✅ Souveraineté des données intégralement préservée.

**Négatives (assumées)**
- ⚠️ Qualité subjective : 4/5 → **3/5** (chiffres parfois inventés, ≥ 1 mauvaise réponse).
- ⚠️ 2/5 runs restent invalides → l'UI doit gérer l'échec explicitement.
- ⚠️ **Objectif ≤ 15 s (CA-J2-6) non tenu** : 73,7 s, dû à l'exécution CPU pure.
- ⚠️ Qualité notée par **1 testeur sur les 3** requis → 2 retours à compléter.

## À surveiller

| KPI | Cible | Alerte | Action si dépassement |
|---|---|---|---|
| Latence p50 | < 15 s (prod) / < 80 s (machine actuelle) | > 100 s sur 3 quiz | Nouvel ADR : bench Ollama natif (Metal) et/ou Groq, arbitrage sponsor |
| Qualité moyenne (≥ 3 testeurs) | ≥ 3,5/5 | < 3/5 sur 2 semaines | Compléter les retours, durcir le prompt (few-shot), réviser l'ADR |
| Taux d'échec validation post-LLM | < 20 % | > 50 % sur 1 semaine | Audit parser + règles de validation |

**Revue planifiée :** avant la Release 1, puis 2 semaines après mise en production. Une
re-décision donnera lieu à un **ADR-002** qui remplacera celui-ci.