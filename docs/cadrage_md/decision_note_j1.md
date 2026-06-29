# Note de Décision : Intégration de la Cible Enseignante

**Date :** 29 Juin 2026  
**Objet :** Priorisation de la cible "Enseignant" pour la Release 1  
**Décision :** **SHOULD HAVE** (avec un noyau critique en MUST)

## 🧐 Analyse de la Demande
Le sponsor demande l'intégration de Mme Sophie Lefèvre (enseignante) pour permettre le suivi des étudiants. 

### Impact sur le produit
L'ajout de cette cible déplace le produit d'un simple "outil d'auto-étude" vers une "plateforme de pilotage pédagogique". Cela demande l'ajout d'une gestion de groupe (classe) et d'une vue agrégée des données.

## ⚖️ Justification de la Priorité (MoSCoW)
L'équipe a décidé de classer la cible enseignante en **SHOULD HAVE** pour la Release 1, avec la nuance suivante :

1. **Le "Noyau Critique" (MUST) :** 
   Le Dashboard de base (Liste étudiants + Scores) est considéré comme un **MUST**. Pourquoi ? Parce que c'est la promesse faite au sponsor et l'argument principal pour l'adoption de l'outil dans un cadre institutionnel (BTS). Sans cela, la valeur pour l'enseignant est nulle.

2. **Le "Reste" (SHOULD/COULD) :**
   L'analyse fine des erreurs collectives et le système d'envoi de conseils sont classés en **SHOULD**. Ils apportent une valeur immense mais ne sont pas bloquants pour la première démonstration de valeur.

## 📉 Analyse de Capacité & Risques
- **Effort estimé :** L'ajout du dashboard enseignant et de la logique de classe représente environ 15-20% d'effort supplémentaire sur le backend (nouvelles API) et le frontend (nouvelles pages).
- **Risque :** Le risque principal est la dilution de l'effort sur le flux "Étudiant" qui reste la priorité absolue.
- **Mitigation :** On s'engage à livrer un Dashboard Enseignant "Lecture Seule" (Read-only) en priorité, et la messagerie dans un second temps.

**Conclusion :** Nous acceptons l'intégration de Mme Lefèvre. Nous sécurisons d'abord le parcours Étudiant, puis nous déployons le Dashboard Enseignant pour satisfaire le sponsor sans compromettre la stabilité du MVP.
