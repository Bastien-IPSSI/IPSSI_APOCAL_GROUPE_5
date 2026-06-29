# Product Backlog — EduTutor IA

## 📌 Légende MoSCoW
- **Must have :** Vital pour la Release 1. Sans cela, le produit est inutilisable.
- **Should have :** Important, apporte une forte valeur, mais peut être différé si critique.
- **Could have :** "Nice to have", bonus si le temps le permet.
- **Won't have :** Hors scope pour la Release 1.

---

## 📋 User Stories

### 🎓 Cible Étudiant
| ID | Story (INVEST) | Priorité | Justification |
| :--- | :--- | :--- | :--- |
| US-S1 | En tant qu'étudiant, je veux créer un compte par email afin de sauvegarder mes quiz et mon historique. | **MUST** | Base de l'identification et de la persistance des données. |
| US-S2 | En tant qu'étudiant, je veux uploader un cours (PDF/Texte) afin que l'IA puisse générer un quiz basé sur mon contenu. | **MUST** | Coeur de la proposition de valeur. |
| US-S3 | En tant qu'étudiant, je veux répondre à un QCM de 10 questions afin de tester mes connaissances. | **MUST** | Fonctionnalité principale de révision. |
| US-S4 | En tant qu'étudiant, je veux voir mon score et le détail des corrections afin de comprendre mes erreurs. | **MUST** | Indispensable pour l'apprentissage. |
| US-S5 | En tant qu'étudiant, je veux consulter mon historique de quiz afin de suivre ma progression. | **SHOULD** | Valeur ajoutée pour la motivation, mais secondaire pour le test initial. |

### 👩‍🏫 Cible Enseignant (Mme Lefèvre)
| ID | Story (INVEST) | Priorité | Justification |
| :--- | :--- | :--- | :--- |
| US-T1 | En tant qu'enseignant, je veux accéder à un dashboard de classe afin de voir la liste de mes étudiants et leurs derniers scores. | **MUST** | Demande explicite du sponsor et besoin primaire de Mme Lefèvre. |
| US-T2 | En tant qu'enseignant, je veux identifier les questions les plus ratées par la classe afin d'ajuster mon cours en présentiel. | **SHOULD** | Forte valeur pédagogique, mais nécessite une agrégation de données plus complexe. |
| US-T3 | En tant qu'enseignant, je veux pouvoir envoyer un message de conseil/encouragement à un étudiant spécifique depuis l'interface. | **SHOULD** | Ferme la boucle "Monitoring $\rightarrow$ Action", essentiel pour l'expérience utilisateur. |

---

## 🛠️ Définition de Ready (DoR) & Done (DoD)
- **DoR :** La story est estimée, possède des critères d'acceptation clairs et le design UI est validé.
- **DoD :** Le code est merge dans `main`, les tests unitaires passent, et la fonctionnalité est vérifiée manuellement sur le frontend.
