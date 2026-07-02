# Story Map - Securite J3

## Flux Utilisateur

### 1. Onboarding et Authentification
- Etudiant : Inscription -> Validation Email -> Connexion.
- Enseignant : Inscription -> Validation Email -> Creation de Classe.

### 2. Cycle de Revision (Etudiant)
- Saisie : Upload PDF / Texte -> Parametrage du quiz.
- Generation : **Saisie du prompt -> Filtrage et Protection (Couches 1 et 2) -> Appel LLM -> Validation de la sortie (Couche 3)**.
- Action : Passage du Quiz.
- Feedback : Score final -> Revue des erreurs -> Correction.
- Suivi : Consultation du Dashboard personnel -> Historique.

### 3. Cycle de Pilotage (Enseignant)
- Vue d'ensemble : Dashboard Classe -> Liste des etudiants -> Moyenne globale.
- Analyse : Detail par etudiant -> Identification des points de blocage.
- Action : Envoi de conseils -> Suivi de l'evolution des scores.

---

## Planning des Releases (Sprints)
- Sprint 1 : Auth, Upload, Generation basique.
- Sprint 2 : Correction, Scores, Dashboard Etudiant.
- Sprint 3 : Dashboard Enseignant, Liaison Classe, Vue Scores.
- Sprint 4 : **Implementation du framework de securite (4 couches)** et tests adversariaux.
- Sprint 5 : Analyse des erreurs collectives, Messagerie conseils.
