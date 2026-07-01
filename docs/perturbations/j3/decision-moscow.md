# Note de décision MoSCoW — Perturbation J3 (Sécurité LLM + RGPD)

**Auteur** : Équipe 05 (Valentin LOUVET · Amine KAOUTAR · Erwann HILLION · Alexandre BONJOUR · Evan AFONSO · Bastien ROUVIERE · Aya SGHAIER)
**Date** : 01/07/2026
**Version** : v1.0
**Statut** : Livré Sprint 5 (MVP mercredi soir)

## Contexte

J3 introduit deux perturbations non-fonctionnelles critiques arrivées le même jour que la livraison MVP :

- **J3 (10h00)** — Prompt Injection : OWASP LLM-01. Exigence : implémenter les 4 couches de défense.
- **J3-bis (10h30)** — SAR RGPD reçu : Art. 15 en pratique. Exigence : endpoint d'export utilisateur + audit trail.

## Décisions retenues

### Sécurité LLM — OWASP LLM-01

| Couche | Décision | Livré en |
|--------|----------|----------|
| 1. Séparation system/user | MUST — déjà implémentée (Sprint 1-3) | S1-S3 ✅ |
| 2. System prompt défensif | MUST — ajout de l'instruction défensive dans `SYSTEM_PROMPT` | S5 ✅ |
| 3. Validation de sortie | MUST — déjà implémentée via `parse_and_validate_quiz()` | S1-S3 ✅ |
| 4. Tests adversariaux CI | MUST — 5 vecteurs d'attaque ajoutés dans `llm/tests.py` | S5 ✅ |

**Différé (COULD, Sprint 6-7)** :
- Sanitisation active du texte source avant injection dans le prompt (strip Unicode homoglyphes, décodage base64 suspect).
- Monitoring des tentatives d'injection en production (log structuré + alerte).
- Limite de taux (rate-limit) sur `/api/llm/generate-quiz/` pour limiter le volume d'attaques automatisées.

### RGPD — SAR Art. 15 + 20

| Exigence | Décision | Livré en |
|----------|----------|----------|
| Art. 15 — droit d'accès (endpoint export) | MUST — `GET /api/accounts/me/export/` | S5 ✅ |
| Art. 17 — droit à l'effacement | MUST — déjà implémenté via `DELETE /api/accounts/profile/` | S3 ✅ |
| Art. 20 — portabilité (JSON téléchargeable) | MUST — couvert par l'endpoint export + `Content-Disposition: attachment` | S5 ✅ |
| Audit trail SAR | MUST — log structuré à chaque appel export (IP + email + id + timestamp) | S5 ✅ |
| Politique de rétention documentée | MUST — `docs/perturbations/j3/politique-retention.md` | S5 ✅ |

**Différé (COULD, Sprint 6-7)** :
- Table `SARRequest` dédiée en base (audit trail persistant, consultable admin).
- Purge automatique des comptes inactifs depuis > 3 ans (tâche cron Celery).
- Email de confirmation à l'utilisateur lors de la réception d'une demande SAR.
- Export incluant le texte source des PDF uploadés (coût : taille de la réponse × N quiz).

## Analyse arbitrage MVP vs conformité

Le risque d'une amende CNIL (référence Klarna : 1,2 M€) justifie de livrer les deux exigences MUST en Sprint 5, même si elles s'ajoutent à la livraison MVP. L'estimation est de **3-4h de développement** (endpoint + tests + docs), compatible avec la capacité restante du sprint.

Les éléments différés (table SAR persistante, purge auto) sont tracés ici noir sur blanc, partagés avec le PO, et planifiés en Sprint 6-7.

## Validation

| Rôle | Nom | Décision |
|------|-----|----------|
| Product Owner (externe) | _à renseigner_ | _en attente revue_ |
| Scrum Master | _à désigner en équipe_ | _en attente revue_ |
| Équipe (7 membres) | Équipe 05 | Consensus atteint en cadrage J3, 01/07/2026 |
