# Analyse des risques — Perturbation J4 (Passage à l'échelle)

**Équipe** : 05 · **Date** : 02/07/2026 · **Version** : v1.0
**Méthode** : Matrice probabilité × impact · Exposition = P × I · Seuil de traitement : exposition ≥ 6

## Matrice probabilité × impact

```
Probabilité ↓ / Impact →   FAIBLE (1)          MOYEN (2)             FORT (3)
─────────────────────────────────────────────────────────────────────────────────
ÉLEVÉE (3)                  R5 i18n bâclée (3)  R2 Rejet RGAA (6)    R1 Saturation (9)
MOYENNE (2)                 R6 Docs non trad. (2) R4 Dette technique (4) R3 Coût cloud (6)
FAIBLE (1)                  —                   R7 Départ prestataire (2) R8 Panne LLM (3)
─────────────────────────────────────────────────────────────────────────────────
Exposition = P×I. 🔴 ≥6 traiter en priorité · 🟡 3-5 surveiller · 🟢 ≤2 accepter
```

## Registre des risques

| # | Risque | Cause probable | P | I | Expo | Couleur | Action préventive → backlog |
|---|--------|---------------|---|---|------|---------|----------------------------|
| R1 | **Saturation serveurs au pic de trafic** | Millions d'élèves simultanés, un seul serveur, DB non répliquée | 3 | 3 | **9** | 🔴 | US-34 : Test de charge + cache Redis + autoscaling (13 SP MUST S7) |
| R2 | **Rejet du contrat État pour non-conformité RGAA** | Contrastes insuffisants, navigation clavier absente | 3 | 2 | **6** | 🔴 | US-30 : Audit RGAA + focus & contrastes (8 SP MUST S6) · US-31 : Navigation clavier (8 SP MUST S6) |
| R3 | **Coût cloud hors budget après mise à l'échelle** | Ressources surdimensionnées, absence de suivi en temps réel | 2 | 3 | **6** | 🔴 | US-34 (autoscaling) + ADR-002 : architecture serverless ou managed — alerte budget $X/mois |
| R4 | **Dette technique bloquante** | Code non refactorisé depuis S1-S3, montée en charge révèle des couplages | 2 | 2 | **4** | 🟡 | Story refacto ciblée (3 SP SHOULD S7) — identifier les 2 modules à plus forte dette |
| R5 | **i18n bâclée** (textes codés en dur) | Pas de fichiers de langue, traductions impossibles en prod | 3 | 1 | **3** | 🟡 | US-32 : Externaliser les textes (8 SP MUST S7) — prérequis de toute traduction |
| R6 | **Docs / interface non traduites** | Textes UI non externalisés, priorité accordée aux fonctionnalités | 2 | 1 | **2** | 🟢 | Couvert par US-32 en amont ; accepté pour Release 2 |
| R7 | **Départ d'un prestataire LLM** | Dépendance à un seul fournisseur (Ollama local + Groq cloud) | 1 | 2 | **2** | 🟢 | US-36 : Fournisseur LLM de secours (5 SP COULD S8) |
| R8 | **Panne du fournisseur LLM en pic** | Groq / Ollama indisponible lors d'une charge nationale | 1 | 3 | **3** | 🟡 | US-36 : multi-fournisseur + file d'attente asynchrone (5 SP COULD S8) |

## Risques prioritaires — traitement détaillé

### R1 — Saturation serveurs (Expo 9 🔴 — traiter immédiatement)

**Symptôme** : les serveurs ont failli tomber hier soir après le passage télé.

**Actions** :
- **Réduire la probabilité** : autoscaling horizontal (Kubernetes / Docker Swarm), cache Redis pour les réponses LLM identiques.
- **Réduire l'impact** : réplication DB en lecture, CDN pour le statique, queue asynchrone pour les générations LLM (les utilisateurs reçoivent un email quand le quiz est prêt).
- **Backlog** : US-34 (13 SP MUST S7) + US-35 Réplication DB (8 SP SHOULD S7).

### R2 — Rejet RGAA (Expo 6 🔴 — contractuel État)

**Symptôme** : aucun audit RGAA réalisé à ce jour, contrastes non vérifiés, navigation clavier non testée.

**Actions** :
- **Réduire la probabilité** : audit RGAA automatisé (axe-core, Lighthouse), rapport de conformité partagé avec l'État.
- **Réduire l'impact** : livrer d'abord les critères bloquants (contrastes ≥ 4,5:1, focus visible, alt textuels) avant la signature du contrat.
- **Backlog** : US-30 (8 SP MUST S6) + US-31 (8 SP MUST S6) + US-37 ARIA (5 SP SHOULD S7).

### R3 — Coût cloud hors budget (Expo 6 🔴)

**Symptôme** : passage à l'échelle nationale sans suivi de coûts = facture cloud imprévisible.

**Actions** :
- Budget d'alerte configuré (AWS/GCP : alerte à 80 % du budget mensuel).
- Autoscaling avec limite haute (max instances).
- Cache Redis pour éviter les appels LLM redondants (impact direct sur le coût par requête).
- **Backlog** : couvert par US-34 (autoscaling + cache) ; ADR-002 à rédiger en S7.

## Récapitulatif actions préventives → backlog

| Action préventive | US associée | MoSCoW | SP | Sprint |
|-------------------|-------------|--------|----|--------|
| Audit RGAA + focus/contrastes | US-30 | **MUST** | 8 | S6 |
| Navigation clavier + alt textuelles | US-31 | **MUST** | 8 | S6 |
| Externaliser textes (i18n) | US-32 | **MUST** | 8 | S7 |
| Test de charge + cache + autoscaling | US-34 | **MUST** | 13 | S7 |
| Réplication DB + backup | US-35 | SHOULD | 8 | S7 |
| Fournisseur LLM de secours | US-36 | COULD | 5 | S8 |
| Lecteur d'écran + ARIA | US-37 | SHOULD | 5 | S7 |
