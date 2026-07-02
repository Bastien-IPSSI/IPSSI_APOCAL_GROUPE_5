# Product Backlog - Securite J3

## Legende MoSCoW
- Must have : Vital pour la Release 1.
- Should have : Important, apporte une forte valeur.
- Could have : Bonus.
- Won't have : Hors scope.

---

## User Stories

### Cible Etudiant
| ID | Story (INVEST) | Priorite | Justification |
| :--- | :--- | :--- | :--- |
| US-S1 | En tant qu'etudiant, je veux creer un compte par email afin de sauvegarder mes quiz et mon historique. | MUST | Base de l'identification. |
| US-S2 | En tant qu'etudiant, je veux uploader un cours (PDF/Texte) afin que l'IA puisse generer un quiz base sur mon contenu. | MUST | Coeur de la proposition de valeur. |
| US-S3 | En tant qu'etudiant, je veux repondre a un QCM de 10 questions afin de tester mes connaissances. | MUST | Fonctionnalite principale. |
| US-S4 | En tant qu'etudiant, je veux voir mon score et le detail des corrections afin de comprendre mes erreurs. | MUST | Indispensable pour l'apprentissage. |
| US-S5 | En tant qu'etudiant, je veux consulter mon historique de quiz afin de suivre ma progression. | SHOULD | Valeur ajoutee pour la motivation. |

### Cible Enseignant
| ID | Story (INVEST) | Priorite | Justification |
| :--- | :--- | :--- | :--- |
| US-T1 | En tant qu'enseignant, je veux acceder a un dashboard de classe afin de voir la liste de mes etudiants et leurs derniers scores. | MUST | Demande explicite du sponsor. |
| US-T2 | En tant qu'enseignant, je veux identifier les questions les plus ratees par la classe afin d'ajuster mon cours. | SHOULD | Forte valeur pedagogique. |
| US-T3 | En tant qu'enseignant, je veux pouvoir envoyer un message de conseil a un etudiant specifique. | SHOULD | Ferme la boucle monitoring-action. |

### Securite et Conformite (J3)
| ID | Story (INVEST) | Priorite | Justification |
| :--- | :--- | :--- | :--- |
| US-SEC1 | En tant qu'administrateur, je veux implementer une defense en 4 couches contre la prompt injection afin d'empecher la manipulation du LLM. | MUST | Risque critique de securite (OWASP LLM-01). |
| US-SEC2 | En tant qu'utilisateur, je veux que mes donnees soient traitees selon les normes RGPD afin de garantir la confidentialite de mes cours. | MUST | Obligation legale et conformite. |

---

## Definition de Ready (DoR) et Done (DoD)
- DoR : Story estimee, criteres d'acceptation clairs et design UI valide.
- DoD : Code merge, tests unitaires passes, et **validation contre le jeu de tests adversariaux (anti-injection)**.
