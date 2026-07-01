# Politique de rétention des données — EduTutor IA

**Version** : v1.0 — 01/07/2026
**Équipe** : Groupe 05 IPSSI
**Base légale** : RGPD Art. 5(1)(e) — limitation de la conservation

## Données conservées et durées

| Catégorie | Donnée | Durée de conservation | Justification |
|-----------|--------|-----------------------|---------------|
| Compte utilisateur | email, prénom, nom, mot de passe hashé | Jusqu'à suppression du compte | Nécessaire au fonctionnement du service |
| Profil | email_verified, date d'inscription | Jusqu'à suppression du compte | Nécessaire au fonctionnement |
| Quiz | titre, score, date de création | Jusqu'à suppression du compte | Valeur pédagogique pour l'utilisateur |
| Questions | énoncé, options, réponse choisie | Jusqu'à suppression du compte ou du quiz | Associé au quiz parent |
| Texte source (PDF) | Contenu extrait du PDF | Jusqu'à suppression du compte ou du quiz | Nécessaire pour audit de qualité LLM |
| Logs d'audit SAR | IP, email, timestamp de chaque export RGPD | 3 ans | Preuve de conformité CNIL |
| Tokens d'authentification | Token DRF | Jusqu'à déconnexion ou changement de mdp | Sécurité session |

## Droits des utilisateurs

| Droit RGPD | Endpoint | Délai de traitement |
|------------|----------|---------------------|
| Art. 15 — Accès | `GET /api/accounts/me/export/` | Immédiat (self-service) |
| Art. 16 — Rectification | `PATCH /api/accounts/profile/` | Immédiat (self-service) |
| Art. 17 — Effacement | `DELETE /api/accounts/profile/` | Immédiat (hard delete) |
| Art. 18 — Limitation | Contact équipe (pas encore self-service) | 72h |
| Art. 20 — Portabilité | `GET /api/accounts/me/export/` (JSON téléchargeable) | Immédiat (self-service) |

## Suppression des données (Art. 17)

La suppression de compte (`DELETE /api/accounts/profile/`) est un **hard delete** :
- Le modèle `User` Django est supprimé.
- `Profile`, `Quiz` et `Question` sont supprimés en cascade (`on_delete=CASCADE`).
- Le token d'authentification est invalidé avant suppression.
- Les logs d'audit SAR sont conservés 3 ans (obligation légale de preuve).

## Éléments différés (Sprint 6-7)

- **Purge automatique** des comptes inactifs depuis > 3 ans (tâche Celery planifiée).
- **Table `SARRequest`** : persistance en base de chaque demande d'accès (actuellement : log applicatif uniquement).
- **Email de confirmation SAR** : notification à l'utilisateur à chaque export.
