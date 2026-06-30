# Résultats benchmark LLM — Perturbation P2 (latence)

> Comparaison de modèles Ollama sur la génération de quiz, à texte et prompt identiques. Latence pure de génération (appel direct `/api/generate`, hors auth/DB).

## Paramètres

- **Texte source** : `test_text_grc.txt` (165 mots, 1189 caractères)
- **Hôte Ollama** : `http://ollama:11434`
- **Runs par modèle** : 5
- **Options** : `stream=false`, `format=json`, `temperature=0.4` (identiques à la prod)
- **Prompt** : `llm.services.quiz_prompt.build_full_prompt` (prod)

## ⚠️ Comment lire « Quiz valides » (à ne pas confondre)

**Tous les modèles renvoient TOUJOURS une réponse.** Chaque run JSON contient un
champ `raw_response` rempli de texte (souvent même des questions lisibles). Mais
une réponse ≠ un quiz exploitable.

La colonne **« Quiz valides »** ne compte un run que si sa réponse passe la
**validation stricte de prod** (`llm.services.quiz_prompt.parse_and_validate_quiz`) :

- **exactement 10 questions**, et
- **exactement 4 options par question** (le fameux « 10×4 »), et
- un `correct_index` valide (0 à 3).

> Exemple : `phi3_mini/run_02.json` a bien un `raw_response` de ~2863 caractères
> plein de questions — **la réponse existe** — mais il n'y a que **9 questions**
> (pas 10), donc le run est compté **invalide**. De même, « Question 2 : il faut
> exactement 4 options » = la réponse existe mais une question n'a pas ses 4 choix.

Autrement dit : `0/5` pour `phi3:mini` ne veut **pas** dire « 0 réponse », mais
« **0 réponse au bon format 10×4** sur 5 essais ».

## Tableau récapitulatif

| Modèle | Quiz valides (10×4) | p50 (méd.) | p95 | min | max | moyenne |
|---|---|---|---|---|---|---|
| `llama3.1:8b` | 2/5 | 140.79 s | 182.16 s | 109.98 s | 188.76 s | 145.97 s |
| `llama3.2:3b` | 3/5 | 73.70 s | 82.47 s | 64.89 s | 82.76 s | 73.51 s |
| `phi3:mini` | 0/5 | 69.89 s | 94.26 s | 37.63 s | 95.69 s | 68.27 s |

> Les statistiques de latence sont calculées sur **tous** les runs où une latence
> a pu être mesurée (réponse reçue), qu'elle soit valide ou non — seul le run
> en erreur HTTP (`✗`) est exclu.

## Empreinte ressources

| Modèle | Disque (pull) | RAM résidente (approx.) | GPU |
|---|---|---|---|
| `llama3.1:8b` | ~4.7 Go | ~6–8 Go | aucun (CPU-only en Docker Mac) |
| `llama3.2:3b` | ~2.0 Go | ~3–4 Go | aucun (CPU-only en Docker Mac) |
| `phi3:mini` | ~2.3 Go | ~3–4 Go | aucun (CPU-only en Docker Mac) |

> ⚠️ Docker Desktop sur macOS **n'expose pas le GPU Metal** du M3 Pro : les trois
> modèles tournent en **CPU pur**, ce qui explique les latences élevées vs un
> Ollama natif (Metal) ou une machine GPU.

## Qualité subjective (/5)

Notation pédagogique du quiz généré (fidélité au cours, pertinence des
distracteurs, exactitude de la bonne réponse, langue). **≥ 3 testeurs requis** —
1 rempli, 2 à compléter.

| Testeur | `llama3.1:8b` | `llama3.2:3b` | `phi3:mini` |
|---|---|---|---|
| #1 (revue des runs archivés) | **4/5** | **3/5** | **2/5** |
| #2 *(à compléter)* | — | — | — |
| #3 *(à compléter)* | — | — | — |
| **Moyenne** | *4/5\** | *3/5\** | *2/5\** |

\* moyenne provisoire sur 1 testeur — à recalculer une fois ≥ 3 retours réunis.

**Justification du testeur #1** (sur le cours CRM de référence) :
- `llama3.1:8b` (4/5) : questions cohérentes et fidèles au texte, distracteurs
  plausibles ; petit défaut, des options parfois trop proches (Q1 « analyser » vs « améliorer »).
- `llama3.2:3b` (3/5) : pertinent et 2× plus rapide, mais **chiffres inventés**
  (« supérieur de 200 % » absent du cours) et au moins **une bonne réponse erronée**
  (Q4 : « acquérir » alors qu'un suivi personnalisé vise à *fidéliser*).
- `phi3:mini` (2/5) : **mélange français/anglais** dans les options + format
  jamais valide (10×4) → inexploitable en l'état.

## Détail des latences par run (secondes)

| Modèle | run 1 | run 2 | run 3 | run 4 | run 5 |
|---|---|---|---|---|---|
| `llama3.1:8b` | 188.76≈ | 134.59≈ | 140.79≈ | 155.73 ✅ | 109.98 ✅ |
| `llama3.2:3b` | 64.90≈ | 64.89≈ | 81.29 ✅ | 73.70 ✅ | 82.76 ✅ |
| `phi3:mini` | 86.18≈ | 95.69≈ | 0.64✗ | 37.63≈ | 53.60≈ |

Légende : `✅` quiz valide (10×4) · `≈` réponse reçue mais quiz **invalide** (format ≠ 10×4) · `✗` aucune réponse (erreur HTTP / Ollama injoignable).

### Pourquoi chaque run invalide a échoué (la réponse existait pourtant)

| Modèle | run | Réponse reçue ? | Raison du rejet |
|---|---|---|---|
| `llama3.1:8b` | 1 | oui | Question 2 : pas exactement 4 options |
| `llama3.1:8b` | 2 | oui | Question 2 : pas exactement 4 options |
| `llama3.1:8b` | 3 | oui | Question 3 : pas exactement 4 options |
| `llama3.2:3b` | 1 | oui | Question 2 : pas exactement 4 options |
| `llama3.2:3b` | 2 | oui | Question 2 : pas exactement 4 options |
| `phi3:mini` | 1 | oui | Question 4 : pas exactement 4 options |
| `phi3:mini` | 2 | oui | Seulement 9 questions (10 attendues) |
| `phi3:mini` | 3 | **non** | HTTP 500 — Ollama injoignable (pas de réponse) |
| `phi3:mini` | 4 | oui | Seulement 5 questions (10 attendues) |
| `phi3:mini` | 5 | oui | Question 4 : pas exactement 4 options |

## Fichiers générés

- `results/llama3.1_8b/run_01.json` … `run_05.json` (questions de chaque run)
- `results/llama3.2_3b/run_01.json` … `run_05.json` (questions de chaque run)
- `results/phi3_mini/run_01.json` … `run_05.json` (questions de chaque run)

> ⚠️ **Aucun modèle de prod n'a été modifié.** Ce document est une mesure ; le changement éventuel de `OLLAMA_MODEL` (.env) attend validation.
