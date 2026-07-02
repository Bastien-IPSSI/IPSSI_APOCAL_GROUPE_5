# Sprint Backlog — Sprint S6 (next sprint J4)

**Équipe** : 05 · **Date début** : 02/07/2026 jeudi matin · **Date fin** : 02/07/2026 jeudi 17h
**Capacité** : 7 personnes × demi-journée ≈ 28 SP · **Objectif sprint** : livrer RGAA MUST (US-30, US-31) pour valider le contrat État

---

## Objectif Sprint S6

> **Livrer les correctifs RGAA critiques (accessibilité MUST)** qui conditionnent le contrat État, tout en avançant sur le dashboard enseignant (SHOULD J1).

Critère de succès : score Lighthouse Accessibilité ≥ 90 % sur les pages `/upload`, `/quiz` et `/profile`.

---

## Stories engagées S6

| ID | Story | Tag | MoSCoW | SP | Responsable | Statut |
|----|-------|-----|--------|----|-------------|--------|
| US-30 | Audit RGAA automatisé (axe-core/Lighthouse CI) + correctifs focus visible + contrastes ≥ 4,5:1 | `[a11y]` | **MUST** | 8 | À assigner | 📋 À faire |
| US-31 | Navigation clavier complète (`Tab`, `Shift+Tab`, `Enter`, `Escape`) + attributs `alt` sur toutes les icônes | `[a11y]` | **MUST** | 8 | À assigner | 📋 À faire |
| US-21 | Dashboard classe Mme Lefèvre — vue liste élèves + score moyen *(périmètre réduit à 8 SP en S6)* | — | SHOULD | 8 | À assigner | 📋 À faire |
| US-07 | Réinitialisation mot de passe via email *(4 SP en S6, suite en S7 si nécessaire)* | — | SHOULD | 4 | À assigner | 📋 À faire |
| **TOTAL** | | | | **28** | | |

---

## Tâches détaillées

### US-30 — Audit RGAA + focus & contrastes (8 SP)

| # | Tâche | Estimation (h) | Statut |
|---|-------|---------------|--------|
| 30.1 | Installer axe-core + script CI Lighthouse (seuil ≥ 90 %) | 1h | 📋 |
| 30.2 | Audit manuel des 5 pages clés (login, upload, quiz, résultat, profil) | 2h | 📋 |
| 30.3 | Corriger les contrastes de texte (changer les tokens CSS des couleurs secondaires) | 2h | 📋 |
| 30.4 | Rendre le focus visible sur tous les éléments interactifs (`:focus-visible`) | 1h | 📋 |
| 30.5 | Tests + rapport Lighthouse dans CI (badge score dans README) | 1h | 📋 |
| 30.6 | Revue PO + merge | 1h | 📋 |

### US-31 — Navigation clavier + alt textuelles (8 SP)

| # | Tâche | Estimation (h) | Statut |
|---|-------|---------------|--------|
| 31.1 | Cartographier les éléments interactifs sans `tabIndex` ou avec `-1` | 1h | 📋 |
| 31.2 | Ajouter `tabIndex=0` + handler `onKeyDown Enter/Space` sur les boutons custom | 2h | 📋 |
| 31.3 | Implémenter navigation clavier dans le composant quiz (questions 1→10 au clavier) | 2h | 📋 |
| 31.4 | Ajouter `alt` descriptif sur toutes les icônes SVG + images | 1h | 📋 |
| 31.5 | Test manuel lecteur d'écran (NVDA + Firefox) sur le flux complet | 1h | 📋 |
| 31.6 | Revue PO + merge | 1h | 📋 |

### US-21 — Dashboard classe (8 SP réduit)

| # | Tâche | Estimation (h) | Statut |
|---|-------|---------------|--------|
| 21.1 | Endpoint `GET /api/admin/class-dashboard/` (liste élèves + score moyen + dernière activité) | 2h | 📋 |
| 21.2 | Page frontend `/teacher/dashboard` avec tableau trié par score | 2h | 📋 |
| 21.3 | Indicateur visuel « à risque » (score < 5 sur 10) | 1h | 📋 |
| 21.4 | Tests backend + revue PO | 1h | 📋 |

---

## Définition of Done (DoD) Sprint S6

- [ ] US-30 : score Lighthouse ≥ 90 % sur 5 pages en CI (non-régression bloquante).
- [ ] US-31 : flux quiz navigable 100 % clavier sans souris, testé sous NVDA.
- [ ] Code mergé sur `main`, tests pytest + vitest verts.
- [ ] Pas de régression sur les tests existants (21 tests backend passent).
- [ ] Rapport Lighthouse exporté et versionné dans `docs/perturbations/j4/`.

---

## Historique des sprints précédents (conservé)

| Sprint | Objectif | SP livrés | Vélocité |
|--------|----------|-----------|---------|
| S1 | Auth + Upload | 20 | 20 SP |
| S2 | Génération LLM | 18 | 18 SP |
| S3 | Correction + Score | 20 | 20 SP |
| S4 | Historique | 18 | 18 SP |
| S5 | MVP + J3 Sécurité + RGPD | 24 | 24 SP |
| **Vélocité moyenne** | | | **20 SP** |
