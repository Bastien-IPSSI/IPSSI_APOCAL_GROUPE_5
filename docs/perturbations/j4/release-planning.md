# Release Planning — v4.0 (post-perturbation J4)

**Équipe** : 05 · **Date** : 02/07/2026 · **Version** : v4.0
**Vélocité observée** : ~20 SP/sprint · **Capacité/sprint** : 7 personnes × demi-journée

---

## Vue d'ensemble des releases

| Release | Sprints | SP cible | SP scope | Date cible | Statut |
|---------|---------|----------|----------|-----------|--------|
| **R1 — MVP** | S1-S5 | 100 | 34 MUST livrés | 01/07/2026 | ✅ Livré |
| **R2 — État & Scale** | S6-S7 | 56 | 37 MUST + 52 SHOULD | 17/07/2026 | 🚧 En cours |
| **R3 — International** | S8-S9 | 40 | 55 COULD | 31/07/2026 | 📋 Planifié |

---

## Release 1 — MVP (livré) ✅

**Date de livraison** : 01/07/2026 17h45
**Scope livré** : F1-F6 (US-01 à US-06) + J3 (US-24 à US-27)

| Story | SP | Sprint |
|-------|----|--------|
| US-01 Compte email | 3 | S1 |
| US-02 Upload PDF/texte | 5 | S1 |
| US-03 Génération quiz IA | 8 | S2 |
| US-04 Correction auto | 3 | S3 |
| US-05 Score + détails | 3 | S3 |
| US-06 Historique | 3 | S4 |
| US-24 Prompt défensif | 2 | S5 |
| US-25 Tests adversariaux | 3 | S5 |
| US-26 Export RGPD | 3 | S5 |
| US-27 Politique rétention | 1 | S5 |
| **Total** | **34** | |

---

## Release 2 — État & Scale (S6-S7) 🚧

**Date cible** : 17/07/2026
**Condition de signature du contrat État** : US-30 + US-31 (RGAA) livrés et validés en S6.

### Sprint S6 — Accessibilité RGAA (MUST) + Enseignant (SHOULD)

**Capacité** : ~28 SP

| ID | Story | Tag | MoSCoW | SP |
|----|-------|-----|--------|----|
| US-30 | Audit RGAA + focus & contrastes | `[a11y]` | **MUST** | 8 |
| US-31 | Navigation clavier + alt textuelles | `[a11y]` | **MUST** | 8 |
| US-21 | Dashboard classe Mme Lefèvre | — | SHOULD | 8 *(tronqué)* |
| US-07 | Reset mot de passe email | — | SHOULD | 4 *(tronqué)* |
| **Total S6** | | | | **28** |

### Sprint S7 — i18n + Scale + ARIA (MUST + SHOULD)

**Capacité** : ~28 SP

| ID | Story | Tag | MoSCoW | SP |
|----|-------|-----|--------|----|
| US-32 | Externaliser textes i18n | `[i18n]` | **MUST** | 8 |
| US-34 | Test charge + cache + autoscaling | `[scale]` | **MUST** | 13 |
| US-33 | LLM langue à la volée | `[i18n]` | SHOULD | 5 |
| US-37 | ARIA + lecteur d'écran | `[a11y]` | SHOULD | 5 |
| US-22 | Filtre élèves à risque | — | SHOULD | *(reporte si excès)* |
| **Total S7** | | | | **31** *(à ajuster selon vélocité)* |

> ⚠️ S7 est surchargé (+3 SP). En cas de vélocité < 28 SP : US-37 reporte en S8, US-22 reporte en S8.

---

## Release 3 — International & Résilience (S8-S9) 📋

**Date cible** : 31/07/2026

| ID | Story | Tag | MoSCoW | SP | Sprint |
|----|-------|-----|--------|----|--------|
| US-36 | Fournisseur LLM de secours | `[scale]` | COULD | 5 | S8 |
| US-29 | Table SAR persistante + purge cron | `[rgpd]` | COULD | 8 | S8 |
| US-23 | Message template enseignant | — | COULD | 8 | S8 |
| US-35 | Réplication DB + backup | `[scale]` | SHOULD | 8 | S8 |
| US-28 | Sanitisation texte source | `[sécurité]` | COULD | 5 | S8 |
| US-08 | Bibliothèque cours | — | SHOULD | 5 | S9 |
| US-09 | Difficulté + nb questions | — | COULD | 5 | S9 |
| **Total R3** | | | | **44** | |

---

## Burnup projet (synthèse)

| Sprint | Périmètre total SP | Réalisé cumulé SP |
|--------|-------------------|--------------------|
| S5 | 151 | 100 |
| S6 | **198** (+47 J4) | ~128 |
| S7 | 198 | ~159 |
| S8 | 198 | ~187 |
| S9 | 198 | ~198 ✅ |

**Impact J4** : +47 SP déplacent la fin de projet de S7 à S9 (+2 sprints). Mitigation : recrutement 2 personnes = vélocité ~28 SP → fin en S8.
