# Product Backlog — v3.0 (post-perturbation J3)

**Équipe** : 05 (Valentin LOUVET · Amine KAOUTAR · Erwann HILLION · Alexandre BONJOUR · Evan AFONSO · Bastien ROUVIERE · Aya SGHAIER)
**Sprint concerné** : Cadrage + J1 + J3
**Version** : v3.0
**Date de remise** : 01/07/2026 17h45
**Statut** : En revue PO

**Scope global** : 29 stories · 187 SP · vélocité cible ~56 SP · perturbations intégrées : J1 (+29 SP) et J3 (+21 SP).

## Légende

- **Epics** : EP-01 Identification · EP-02 Gestion de contenu · EP-03 Génération de quiz · EP-04 Passage de quiz · EP-05 Suivi de progression · EP-06 Conformité & administration · EP-07 Sécurité LLM & RGPD (perturbation J3)
- **MoSCoW** : MUST (F1-F6 MVP + fondations J3) · SHOULD (Release 2) · COULD (Release 2 si vélocité) · WON'T (reporté R3+)
- **DoR / DoD** : `□` = à vérifier · `☑` = validé (cf. fichier `product-backlog.xlsx` cadrage v1.0 pour les critères DoR/DoD)

---

## MUST — Release 1 (MVP mercredi 17h45)

| ID | Epic | Persona | Story (INVEST) | SP | Sprint | Critères d'acceptation |
|----|------|---------|----------------|----|--------|------------------------|
| US-01 | EP-01 | Étudiant·e | En tant qu'étudiant·e, je veux créer un compte avec email et mot de passe, afin de sauvegarder mes quizz et y revenir. | 3 | S1 | G: visiteur non authentifié sur `/signup` · W: soumet email valide + mdp ≥ 8 caractères · T: compte créé, email envoyé, redirect `/upload` |
| US-02 | EP-02 | Étudiant·e | En tant qu'étudiant·e, je veux uploader un PDF ou saisir un texte de cours, afin de ne pas avoir à recopier mon support. | 5 | S1 | G: user authentifié sur `/upload` · W: dépose PDF ≤ 5 Mo OU texte ≥ 200 car · T: contenu extrait, stocké, bouton « Générer » visible |
| US-03 | EP-03 | Étudiant·e | En tant qu'étudiant·e, je veux générer un quiz de 10 QCM en moins de 60 s, afin de réviser rapidement un chapitre. | 8 | S2 | G: un cours stocké pour l'user · W: clique « Générer un quiz » sur `/quiz` · T: 10 QCM générés en < 60 s via Llama 3.1 8B local |
| US-04 | EP-04 | Étudiant·e | En tant qu'étudiant·e, je veux soumettre mes réponses et obtenir une correction automatique, afin de savoir où je me situe. | 3 | S3 | G: un quiz généré et affiché · W: user soumet ses 10 réponses · T: chaque réponse comparée, statut bon/mauvais enregistré |
| US-05 | EP-04 | Étudiant·e | En tant qu'étudiant·e, je veux voir mon score /10 et le détail bonnes/mauvaises réponses, afin de mesurer ma progression. | 3 | S3 | G: un quiz soumis · W: user arrive sur `/resultat` · T: score /10 affiché + 10 questions avec corrections détaillées |
| US-06 | EP-05 | Étudiant·e | En tant qu'étudiant·e, je veux consulter l'historique de mes quizz passés, afin de suivre mon évolution dans le temps. | 3 | S4 | G: user authentifié sur `/historique` · W: la page se charge · T: liste des quizz triés par date desc, avec titre/date/score/refaire |
| **US-24** | **EP-07** | **Utilisateur·trice** | **En tant qu'équipe, je veux un system prompt défensif (couche 2 OWASP LLM-01), afin de bloquer les injections en clair.** | **2** | **S5** | **G: `SYSTEM_PROMPT` contient la section « SÉCURITÉ (OWASP LLM-01) » · W: un prompt utilisateur essaie de modifier le format de sortie · T: le LLM produit toujours le JSON attendu (10 questions × 4 options)** |
| **US-25** | **EP-07** | **Utilisateur·trice** | **En tant qu'équipe, je veux 5 tests adversariaux CI (couche 4), afin de détecter automatiquement toute régression de sécurité.** | **3** | **S5** | **G: `backend/llm/tests.py` contient les 5 vecteurs (clair, base64, multilingue, blanc-sur-blanc, Unicode) · W: `pytest -k adversarial` s'exécute en CI · T: 5/5 tests passent, comportement avant/après documenté par docstring** |
| **US-26** | **EP-07** | **Tous personas** | **En tant qu'utilisateur·trice, je veux exporter mes données RGPD via `GET /api/accounts/me/export/`, afin d'exercer mon droit d'accès Art. 15 + 20.** | **3** | **S5** | **G: user authentifié appelle l'endpoint · W: aucun paramètre requis · T: JSON téléchargeable avec `Content-Disposition: attachment`, `base_legale` renseignée, audit trail loggé (IP + email + id)** |
| **US-27** | **EP-07** | **Équipe** | **En tant qu'équipe, je veux une politique de rétention documentée (`politique-retention.md`), afin de tracer les durées légales.** | **1** | **S5** | **G: fichier existe dans `docs/perturbations/j3/` · W: relu par PO · T: mapping Art. 15/16/17/18/20 → endpoints, durées par catégorie, éléments différés listés** |

**Sous-total MUST** : 10 stories · 34 SP (dont **9 SP J3** MUST en S5).

## SHOULD — Release 2 (Sprints 6-7)

| ID | Epic | Persona | Story | SP | Sprint |
|----|------|---------|-------|----|--------|
| US-07 | EP-01 | Étudiant·e | Réinitialisation mot de passe via email (lien magique 24 h) | 3 | S6 |
| US-08 | EP-02 | Étudiant·e | Bibliothèque personnelle des cours uploadés | 5 | S6 |
| US-09 | EP-03 | Étudiant·e | Choix niveau de difficulté + nombre de questions (5-20) | 5 | S6 |
| US-10 | EP-04 | Étudiant·e | Mode timer optionnel par question (10-30 s) | 3 | S7 |
| US-11 | EP-05 | Étudiant·e | Dashboard de progression par chapitre | 5 | S7 |
| US-12 | EP-06 | Tous personas | Export JSON+CSV droit d'accès Art. 15 RGPD | 5 | S5 |
| **US-21** | **EP-05** | **Mme Lefèvre** | **Dashboard synthétique de la classe (moyenne, indicateur risque)** | **13** | **S6** |
| **US-22** | **EP-05** | **Mme Lefèvre** | **Filtrer et marquer les élèves à risque** | **8** | **S6** |

**Sous-total SHOULD** : 8 stories · 47 SP.

## COULD — Release 2 (si vélocité)

| ID | Epic | Persona | Story | SP | Sprint |
|----|------|---------|-------|----|--------|
| US-13 | EP-01 | Étudiant·e | Login social Google / Apple OAuth | 5 | n.c. |
| US-14 | EP-02 | Étudiant·e | Import cours depuis URL web | 8 | n.c. |
| US-15 | EP-03 | Enseignant·e | Générer questions ouvertes corrigées par LLM | 13 | n.c. |
| US-16 | EP-05 | Étudiant·e | Identification automatique des lacunes par chapitre | 8 | n.c. |
| US-17 | EP-06 | Tous personas | Suppression compte + données (Art. 17 droit à l'oubli) | 5 | n.c. |
| **US-23** | **EP-05** | **Mme Lefèvre** | **Envoyer message template à 1+ élèves** | **8** | **S7** |
| **US-28** | **EP-07** | **Équipe** | **Sanitisation active texte source (strip Unicode homoglyphes, décodage base64 suspect)** | **5** | **S6** |
| **US-29** | **EP-07** | **Équipe** | **Table `SARRequest` persistante + purge cron comptes inactifs > 3 ans** | **8** | **S7** |

**Sous-total COULD** : 8 stories · 60 SP.

## WON'T — Release 3+

| ID | Epic | Persona | Story | SP | Justification |
|----|------|---------|-------|----|---------------|
| US-18 | EP-01 | Établissement | SSO entreprise SAML / OIDC | 13 | Reporté R3+ (cible B2B post-prototype) |
| US-19 | EP-03 | Étudiant·e | Chatbot IA conversationnel | 21 | Hors cible primaire (concurrent Khanmigo). Ne pas y aller. |
| US-20 | EP-04 | Étudiant·e | Mode compétition multi-joueurs | 13 | Hors scope vision (apprentissage personnalisé) |

**Sous-total WON'T** : 3 stories · 47 SP.

---

## Récapitulatif

| Niveau | Stories | SP |
|--------|---------|----|
| MUST (Release 1) | 10 | 34 |
| SHOULD (Release 2) | 8 | 47 |
| COULD (Release 2) | 8 | 60 |
| WON'T (Release 3+) | 3 | 47 |
| **TOTAL** | **29** | **188** |

## Traçabilité des perturbations

| Perturbation | Stories ajoutées | Δ SP |
|--------------|------------------|------|
| J1 — persona Mme Lefèvre | US-21, US-22, US-23 | +29 |
| J3 — Sécurité LLM & RGPD | US-24, US-25, US-26, US-27, US-28, US-29 | +22 |
