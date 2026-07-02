# Vision Board — v4.0 (post-perturbation J4)

**Équipe** : 05 · **Date** : 02/07/2026 · **Version** : v4.0

> Mise à jour suite à l'annonce de l'adoption par l'État français et à la levée de fonds.

---

## Vision produit

Transformer la révision d'examens en une expérience personnalisée, accessible et internationale grâce à l'IA — permettant à **tout élève, quelle que soit sa langue ou sa situation de handicap**, de s'auto-évaluer efficacement et aux enseignants de piloter la réussite de leur classe.

---

## Cibles (v4.0 — élargie J4)

| Persona | Description | Axes J4 |
|---------|-------------|---------|
| **Marc** (primaire) | Étudiant Bachelor Informatique, 20 ans, France | Bénéficie de la scalabilité (plus de crashs), de l'i18n si multilingue |
| **Mme Lefèvre** (secondaire J1) | Enseignante BTS 42 ans, Lyon, 28 élèves | Dashboard classe (S6-S7) |
| **Lucia** (nouveau J4) | Lycéenne 17 ans, Séville, malvoyante | Bénéficiaire directe a11y + i18n |
| **État français** (institutionnel J4) | Acheteur public, exige RGAA | Contrat conditionné au RGAA |

---

## Valeur ajoutée (v4.0)

| Pour | Valeur |
|------|--------|
| L'étudiant | Quiz IA instantanés depuis un PDF, score immédiat, révision ciblée — **maintenant accessible et dans sa langue** |
| L'enseignant | Vision classe en temps réel, repérage décrocheurs en 3 clics |
| L'État / établissements | Plateforme de référence RGAA-conforme, déployable dans tous les lycées de France |
| Les élèves malvoyants (Lucia) | Accès complet par lecteur d'écran + navigation clavier + interface traduite |

---

## Objectifs stratégiques (v4.0 — Release 2)

| Objectif | Mesure de succès | Sprint cible |
|----------|-----------------|--------------|
| Conformité RGAA (obligation contractuelle État) | Score Lighthouse Accessibilité ≥ 90 % | S6 |
| Internationalisation ES + EN (levée de fonds) | Interface + quiz en espagnol pour Lucia | S7 |
| Scalabilité nationale (millions d'élèves) | Charge 10 000 req/min sans dégradation | S7 |
| Résilience LLM | Fournisseur de secours actif en < 5 s | S8 |

---

## Ce que J4 change par rapport à v3.0

| Dimension | v3.0 (post-J3) | v4.0 (post-J4) |
|-----------|---------------|---------------|
| Périmètre | Sécurité LLM + RGPD | + Accessibilité + i18n + Scalabilité |
| Utilisateurs cibles | Marc + Mme Lefèvre | + Lucia + État français |
| Marché | France, étudiants en enseignement supérieur | France + Europe hispanophone + lycées publics |
| Risque principal | Injection LLM + amende CNIL | Saturation serveurs + rejet contrat État |
