# Story Map — EduTutor IA

## 🗺️ Flux Utilisateur

### 1. Onboarding & Authentification
- **Étudiant :** Inscription $\rightarrow$ Validation Email $\rightarrow$ Connexion.
- **Enseignant :** Inscription $\rightarrow$ Validation Email $\rightarrow$ Création de Classe.

### 2. Cycle de Révision (Étudiant)
- **Saisie :** Upload PDF / Texte $\rightarrow$ Paramétrage du quiz.
- **Action :** Génération IA $\rightarrow$ Passage du Quiz.
- **Feedback :** Score final $\rightarrow$ Revue des erreurs $\rightarrow$ Correction.
- **Suivi :** Consultation du Dashboard personnel $\rightarrow$ Historique.

### 3. Cycle de Pilotage (Enseignant)
- **Vue d'ensemble :** Dashboard Classe $\rightarrow$ Liste des étudiants $\rightarrow$ Moyenne globale.
- **Analyse :** Détail par étudiant $\rightarrow$ Identification des points de blocage.
- **Action :** Envoi de conseils $\rightarrow$ Suivi de l'évolution des scores.

---

## 📈 Release Planning (Sprints)
- **Sprint 1 :** Auth, Upload, Génération basique (Musts Étudiant).
- **Sprint 2 :** Correction, Scores, Dashboard Étudiant (Musts Étudiant).
- **Sprint 3 :** Dashboard Enseignant, Liaison Classe, Vue Scores (Musts Enseignant).
- **Sprint 4 :** Analyse des erreurs collectives, Messagerie conseils (Shoulds).
