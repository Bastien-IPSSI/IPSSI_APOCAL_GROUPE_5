# Product Backlog — Change log

## v3.0 — 2026-07-01 — Perturbation J3 (Sécurité LLM + RGPD)

Ajout de stories techniques non-fonctionnelles suite aux perturbations J3 (OWASP LLM-01) et J3-bis (SAR RGPD Art. 15).

| ID | Epic | MoSCoW | SP | Sprint | Story |
|----|------|--------|----|--------|-------|
| US-24 | EP-06 | MUST | 2 | S5 | System prompt défensif anti-injection (couche 2 OWASP LLM-01) |
| US-25 | EP-06 | MUST | 3 | S5 | 5 tests adversariaux CI (vecteurs clair/base64/multilingue/blanc-sur-blanc/Unicode) |
| US-26 | EP-07 | MUST | 3 | S5 | Endpoint export RGPD Art. 15+20 (`GET /api/accounts/me/export/`) + audit trail SAR |
| US-27 | EP-07 | MUST | 1 | S5 | Politique de rétention documentée (`politique-retention.md`) |
| US-28 | EP-06 | COULD | 5 | S6 | Sanitisation active du texte source (strip Unicode homoglyphes, base64 suspect) |
| US-29 | EP-07 | COULD | 8 | S7 | Table `SARRequest` persistante + purge automatique comptes inactifs > 3 ans |

**Impact scope** : 23 → 29 stories, 166 → 187 SP (+21 SP).

**Livré en S5** : US-24, US-25, US-26, US-27 — conformes au MVP mercredi soir.
**Différé** : US-28, US-29 — tracé dans `decision-moscow.md`, partagé avec le PO.

**Convention de dépôt** : les artefacts de cadrage v1.0 dans `docs/cadrage/` restent inchangés. Les versions issues de J3 vivent dans le présent dossier `docs/perturbations/j3/`.

**Artefacts livrés ici (`docs/perturbations/j3/`)** :
- `decision-moscow.md` v1.0 — note d'arbitrage J3 (sécurité LLM + RGPD).
- `politique-retention.md` v1.0 — politique de rétention des données.
- `product-backlog-change-log.md` — le présent change log.

---

## v2.0 — 2026-06-30 — Perturbation J1 (persona Mme Lefèvre)

Ajout de 3 user stories enseignant·e suite à l'arrivée du persona secondaire Mme Sophie Lefèvre (professeure BTS Communication, 28 étudiants).

| ID | Epic | MoSCoW | SP | Sprint | Story |
|----|------|--------|----|--------|-------|
| US-21 | EP-05 | SHOULD | 13 | S6 | Dashboard synthétique de la classe (moyenne, 3 derniers scores, indicateur risque, tri/filtre) |
| US-22 | EP-05 | SHOULD | 8  | S6 | Filtrer et marquer les élèves « à suivre » (seuil de score, activité dernière semaine, badge) |
| US-23 | EP-05 | COULD  | 8  | S7 | Envoyer un message template à 1+ élèves (sélection, choix template, historique d'envoi) |

**Impact scope** : 20 → 23 stories, 137 → 166 SP (+29 SP).

**Décision MoSCoW** : SHOULD pour US-21/US-22, COULD pour US-23, conformément à la note `./decision-moscow.md`. Aucune story F1-F6 du MVP n'est dépriorisée : le scope enseignant est embarqué en Release 2 (Sprints 6-7), pas en Release 1.

**Convention de dépôt** : les artefacts de cadrage v1.0 dans `docs/cadrage/` restent inchangés (source de vérité initiale). Les versions v2.0 modifiées par la perturbation J1 sont déposées dans le présent dossier `docs/perturbations/j1/`.

**Artefacts livrés ici (`docs/perturbations/j1/`)** :
- `product-backlog.xlsx` v2.0 — +3 stories US-21/22/23, TOTAL 23 stories · 166 SP, version bumpée, statut « En revue PO ».
- `story-map.xlsx` v2.0 — US-21/22 ajoutés en SHOULD col. « Consulter résultats », US-23 en COULD.
- `decision-moscow.md` — note de décision 1 page (livrable exigé par J1).
- `product-backlog-change-log.md` — le présent change log.
