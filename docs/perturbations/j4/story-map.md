# Story Map — v4.0 (post-perturbation J4)

**Équipe** : 05 · **Date** : 02/07/2026 · **Version** : v4.0

---

## Flux utilisateur (3 personas)

### 1. Flux Étudiant (Marc) — Release 1 ✅ + Release 2

| Étape | S'inscrire | Uploader un cours | Générer le quiz | Répondre | Voir le score | Historique |
|-------|-----------|-------------------|-----------------|----------|---------------|------------|
| **Action** | Compte email | PDF ou texte | IA génère 10 QCM | 10 questions | Score /10 + corrections | Consulter les résultats passés |
| **R1 (livré)** | US-01 ✅ | US-02 ✅ | US-03 ✅ | US-04 ✅ | US-05 ✅ | US-06 ✅ |
| **R2 SHOULD** | — | US-08 bibliothèque | US-09 difficulté | US-10 timer | — | US-11 dashboard progression |

### 2. Flux Enseignant·e (Mme Lefèvre) — Release 2

| Étape | S'inscrire | Lier sa classe | Voir le dashboard | Identifier les décrocheurs | Agir |
|-------|-----------|---------------|-------------------|---------------------------|------|
| **Action** | Compte | Inviter ses élèves | Scores moyens de la classe | Filtre risque | Message conseil |
| **R2 SHOULD** | US-01 | US-21 dashboard | US-21 | US-22 filtre | US-23 message |

### 3. Flux Lucia (accessibilité + i18n) — Release 2 ← NOUVEAU J4

| Étape | Découvrir | Naviguer au clavier | Uploader en espagnol | Quiz en espagnol | Score accessible |
|-------|----------|---------------------|---------------------|-----------------|-----------------|
| **Action** | Interface traduite | Tab/Focus/ARIA | PDF ES | LLM répond en ES | Lecteur d'écran |
| **R2 MUST** | US-32 i18n textes | US-31 clavier + US-37 ARIA | — | US-33 LLM langue | US-30 contrastes |

---

## Colonne RGPD & Sécurité (transverse) — Release 1 ✅ + R2

| Fonction | Endpoint | Story | Sprint |
|----------|----------|-------|--------|
| Export données personnelles | `GET /api/accounts/me/export/` | US-26 ✅ | S5 |
| Suppression compte | `DELETE /api/accounts/profile/` | existant ✅ | S3 |
| Défense injection LLM | System prompt + validation | US-24/25 ✅ | S5 |
| Table SAR persistante | Admin Django | US-29 COULD | S7 |

---

## Colonne Scalabilité & Résilience — Release 2 ← NOUVEAU J4

| Fonction | Technique | Story | MoSCoW | Sprint |
|----------|-----------|-------|--------|--------|
| Test de charge | Locust / k6 | US-34 | **MUST** | S7 |
| Cache Redis | Cache LLM + sessions | US-34 | **MUST** | S7 |
| Autoscaling | Kubernetes HPA | US-34 | **MUST** | S7 |
| Réplication DB | PostgreSQL streaming | US-35 | SHOULD | S7 |
| Fournisseur LLM de secours | Multi-fournisseur | US-36 | COULD | S8 |

---

## Release Planning synthétique

| Release | Sprints | Scope | Date cible |
|---------|---------|-------|-----------|
| R1 MVP | S1-S5 | US-01 à US-06 + US-24 à US-27 | ✅ 01/07/2026 17h45 |
| R2 État | S6-S7 | US-30/31 RGAA + US-32/34 MUST + US-21/22/33/35/37 SHOULD | 17/07/2026 |
| R3 International | S8-S9 | US-36 + traductions EN/ES complètes + US-23 + WON'T reconsidéré | 31/07/2026 |
