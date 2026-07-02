# ADR 001: Préparation au Passage à l'Échelle (Scalability)

**Date** : 02/07/2026
**Statut** : Proposed
**Contexte** : Perturbation J4 - Adoption nationale par l'État français.

## 1. Architecture Actuelle
L'application suit une architecture classique :
- **Frontend** : React (Vite) avec un état local et des appels API via Axios/Fetch.
- **Backend** : Django REST Framework (DRF) avec une base de données PostgreSQL.
- **IA** : Intégration directe avec des modèles LLM (Llama 3.1 via API locale/distante).
- **Déploiement** : Docker Compose simple.

## 2. Limitations Identifiées
- **Couplage** : La logique métier est partiellement mélangée aux vues Django.
- **Performance** : Pas de mise en cache des réponses LLM (coûteux et lent).
- **Robustesse** : Gestion d'erreurs générique, manque de logging structuré pour le debug en production.
- **Dépendances** : Dépendance forte à un seul fournisseur LLM.

## 3. Améliorations Proposées

### A. Optimisation Backend
- **Centralisation de la Configuration** : Utilisation systématique de variables d'environnement pour tous les paramètres (API keys, timeouts, limites).
- **Couche de Service** : Extraction de la logique métier des vues vers des services dédiés pour faciliter les tests et la maintenance.
- **Mise en Cache** : Introduction de Redis pour mettre en cache les quiz générés pour des supports identiques.

### B. Résilience & Observabilité
- **Logging Structuré** : Remplacement des print/logs simples par un système de logging JSON pour une analyse via ELK/Grafana.
- **Gestion d'Erreurs** : Implémentation d'un middleware de gestion d'erreurs global pour renvoyer des codes HTTP et messages standardisés.

### C. Frontend Performance
- **Lazy Loading** : Chargement différé des pages administratives et des composants lourds.
- **Optimisation API** : Utilisation de hooks de mise en cache (SWR ou React Query) pour éviter les appels redondants.

## 4. Justification
Ces choix permettent de passer d'un prototype à une plateforme capable de supporter des pics de charge sans réécrire l'intégralité du système. L'approche est incrémentale pour minimiser la régression.
