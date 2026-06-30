# Protocole de benchmark LLM — Perturbation J2 (latence)

> Ce document décrit **comment** la mesure a été conduite, pour qu'elle soit
> **reproductible** et **comparable** entre modèles. Les chiffres obtenus sont
> dans [`RESULTATS-bruts.md`](./RESULTATS-bruts.md) ; la décision qui en découle
> dans [`ADR-001-choix-modele-llm.md`](./ADR-001-choix-modele-llm.md).

## 1. Objectif

Mesurer, **à conditions strictement identiques**, la **latence** et la
**fiabilité de format** de plusieurs modèles Ollama sur la tâche réelle du
produit : générer un QCM de 10 questions à partir d'un cours.

Deux indicateurs, pas un seul :

- **Latence** — temps de génération pur (`/api/generate`, hors auth/DB/réseau front).
- **Quiz valide** — la réponse passe-t-elle la validation de prod **10 questions × 4 options** ? (cf. `llm.services.quiz_prompt.parse_and_validate_quiz`)

## 2. Variable testée vs variables figées

| | |
|---|---|
| 🎯 **Variable testée** | le **modèle** Ollama (et lui seul) |
| 🔒 **Figé** | texte source, prompt, options de génération, hôte, machine |

Tout le reste est tenu constant pour que l'écart observé soit **imputable au modèle**.

## 3. Jeu de données (cours testé)

- **Fichier** : [`backend/benchmarks/p2-latence/test_text_grc.txt`](../../../backend/benchmarks/p2-latence/test_text_grc.txt)
- **Sujet** : la Gestion de la Relation Client (CRM/GRC)
- **Taille** : **165 mots / 1220 caractères** (cours court, représentatif d'un chapitre de révision)
- **Pourquoi un texte court** : il tient largement sous la limite `MAX_SOURCE_CHARS = 8000` du prompt de prod → on mesure le modèle, pas la troncature de contexte.

## 4. Paramètres de génération (identiques à la production)

| Paramètre | Valeur | Source |
|---|---|---|
| Endpoint | `POST /api/generate` | appel direct Ollama |
| `stream` | `false` | comme `ollama_client.py` |
| `format` | `json` | mode JSON strict |
| `temperature` | `0.4` | comme la prod (factuel, peu créatif) |
| Prompt | `llm.services.quiz_prompt.build_full_prompt` | **le prompt de prod, mutualisé** |
| Hôte Ollama | `http://ollama:11434` | service Docker interne |

> Utiliser **le prompt de prod** (et non un prompt ad hoc) est essentiel : on
> mesure ce que les utilisateurs vivent réellement, y compris la difficulté des
> modèles à respecter la consigne « 10 × 4 ».

## 5. Nombre de runs

- **5 runs par modèle**, séquentiels (`OLLAMA_NUM_PARALLEL=1`).
- Chaque run est isolé : la latence est mesurée bout-à-bout sur l'appel HTTP.
- Pourquoi 5 : suffisant pour exposer la **variance** (un LLM est non-déterministe)
  et calculer une médiane (p50) + un p95 indicatifs, tout en restant tenable sur CPU.
- Chaque run est archivé en JSON (`results/<modèle>/run_NN.json`) avec :
  `latency_seconds`, `parse_ok`, `parse_error`, `n_questions`, `http_error`,
  et le `raw_response` brut → **traçabilité complète**.

## 6. Modèles comparés (≥ 3)

| Modèle | Taille | Rôle dans le test |
|---|---|---|
| `llama3.1:8b` | ~4.7 Go | **référence** (modèle actuel de prod) |
| `llama3.2:3b` | ~2.0 Go | candidat « plus léger » |
| `phi3:mini` | ~2.3 Go | candidat « petit & rapide » |

## 7. Machine & environnement de mesure

| | |
|---|---|
| **Machine** | Apple Mac15,6 — **Apple M3 Pro**, 11 cœurs, **18 Go** RAM |
| **OS** | macOS (Darwin 25.6.0) |
| **Exécution** | Ollama en conteneur Docker (`ollama/ollama:latest`) |
| **Accélération** | **CPU uniquement** — pas de passthrough GPU (`deploy.resources` commenté dans `docker-compose.yml`) |
| **Contention mémoire** | `OLLAMA_MAX_LOADED_MODELS=1`, `OLLAMA_NUM_PARALLEL=1`, `OLLAMA_KEEP_ALIVE=1m` |

> ⚠️ **Les latences absolues dépendent de cette machine.** Sur un CPU plus lent ou
> avec un modèle « à froid » (premier appel après déchargement), les temps montent.
> Ce qui reste comparable d'une machine à l'autre, c'est le **classement relatif**
> des modèles et le **taux de quiz valides**.
>
> 📌 *À confirmer par l'équipe : ces specs sont celles de la machine de mesure
> courante ; vérifier qu'elles correspondent bien à la machine ayant produit les
> runs archivés avant publication finale.*

## 8. Reproduire la mesure

```bash
# 1. Démarrer l'infra et télécharger le modèle à tester
docker compose up -d ollama
docker exec apocalipssi-2026-ollama ollama pull llama3.2:3b

# 2. Pour chaque modèle, lancer 5 appels avec le MÊME texte et le MÊME prompt
#    (prompt = llm.services.quiz_prompt.build_full_prompt), en relevant :
#    latency_seconds + validation via parse_and_validate_quiz.

# 3. Vérifier au passage que le backend voit bien le modèle :
curl -s http://localhost:8000/api/llm/ping/ | python3 -m json.tool
```

> Les résultats bruts (un JSON par run) sont conservés dans
> `backend/benchmarks/p2-latence/results/<modèle>/run_NN.json`.
