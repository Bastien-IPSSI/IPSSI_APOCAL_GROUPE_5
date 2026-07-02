# Product Backlog — Change log

## v4.0 — 2026-07-02 — Perturbation J4 (Passage à l'échelle)

Ajout de 8 stories non-fonctionnelles suite à l'adoption nationale et à la levée de fonds. Trois axes : accessibilité RGAA [a11y], internationalisation [i18n], scalabilité & résilience [scale].

| ID | Epic | Tag | MoSCoW | SP | Sprint | Story |
|----|------|-----|--------|----|--------|-------|
| US-30 | EP-08 | `[a11y]` | **MUST** | 8 | S6 | Audit RGAA automatisé + correctifs focus visible & contrastes ≥ 4,5:1 (Lighthouse ≥ 90 %) |
| US-31 | EP-08 | `[a11y]` | **MUST** | 8 | S6 | Navigation clavier complète + alternatives textuelles sur toutes les icônes |
| US-32 | EP-08 | `[i18n]` | **MUST** | 8 | S7 | Externaliser les textes UI en fichiers de langue (react-i18next) |
| US-34 | EP-09 | `[scale]` | **MUST** | 13 | S7 | Test de charge + cache Redis + autoscaling (Kubernetes HPA) |
| US-33 | EP-08 | `[i18n]` | SHOULD | 5 | S7 | Paramètre de langue du LLM à la volée (`réponds en {langue}`) |
| US-35 | EP-09 | `[scale]` | SHOULD | 8 | S7 | Réplication DB PostgreSQL en lecture + backup quotidien automatisé |
| US-37 | EP-08 | `[a11y]` | SHOULD | 5 | S7 | Support lecteur d'écran + balises ARIA sur quiz et formulaires |
| US-36 | EP-09 | `[scale]` | COULD | 5 | S8 | Fournisseur LLM de secours + file d'attente asynchrone |

**Impact scope** : 29 → 37 stories, 188 → 248 SP (+47 SP).

**MUST livrables S6-S7** : US-30, US-31, US-32, US-34 (37 SP).
**SHOULD S6-S7** : US-33, US-35, US-37 (18 SP) — si vélocité ≥ 28 SP.
**Différé S8** : US-36 — tracé dans `decision-moscow.md`.

**Nouveau persona** : Lucia (lycéenne ES, malvoyante) — nourrit US-30/31/32/33/37.

**Artefacts livrés ici (`docs/perturbations/j4/`)** :
- `decision-moscow.md` v1.0 — note d'arbitrage J4 (3 axes a11y · i18n · scale).
- `analyse-risques.md` v1.0 — 8 risques, matrice P×I, actions préventives → backlog.
- `pilotage-burndown-burnup.md` v1.0 — burndown S6 + burnup projet S1→S9.
- `product-backlog.md` v4.0 — backlog complet 37 stories · 248 SP.
- `persona-lucia.md` v1.0 — nouveau persona accessibilité + i18n.
- `vision-board.md` v4.0 — vision élargie (État, international, scale).
- `story-map.md` v4.0 — 3 flux (Marc, Mme Lefèvre, Lucia) + colonne scale.
- `release-planning.md` v4.0 — R1 ✅ · R2 S6-S7 · R3 S8-S9.
- `sprint-backlog.md` v1.0 — Sprint S6 next sprint (28 SP, objectif RGAA).
- `product-backlog-change-log.md` — le présent change log.

---

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
- `security-note.md` v1.0 — note de sécurité OWASP LLM-01 (diagnostic, 4 couches, limites).
- `veille-securite.md` v1.0 — document de veille sécurité Prompt Injection (chef de projet).
- `scenario-audit.md` v1.0 — scénario d'audit de conformité OWASP LLM-01 (bonus).
- `scenario-test.md` v1.0 — scénario / plan de test des 5 vecteurs adversariaux (bonus).
- `product-backlog.md` v3.0 — backlog complet post-J3 (29 stories, EP-07 Sécurité LLM & RGPD).
- `sprint-backlog.xlsx` v3.0 — ajout de l'onglet « Sprint 5 » (12 tâches J3 : US-24 à US-27) + burndown associé.
- `story-map.xlsx` v3.0 — colonne « Gérer (RGPD) », export RGPD Art. 15/20, effacement Art. 17.
- `product-backlog-change-log.md` — le présent change log.
- Frontend : page `MentionsLegalesPage.tsx` renseignée (RGPD) — `/legal/mentions-legales`.

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
