# Product Backlog — v4.0 (post-perturbation J4)

**Équipe** : 05 (Valentin LOUVET · Amine KAOUTAR · Erwann HILLION · Alexandre BONJOUR · Evan AFONSO · Bastien ROUVIERE · Aya SGHAIER)
**Version** : v4.0 · **Date** : 02/07/2026
**Statut** : En revue PO

**Scope global** : 37 stories · 248 SP · perturbations intégrées : J1 (+29 SP) · J3 (+22 SP) · J4 (+47 SP).

## Légende

- **Epics** : EP-01 Identification · EP-02 Contenu · EP-03 Génération quiz · EP-04 Passage quiz · EP-05 Suivi progression · EP-06 Administration · EP-07 Sécurité LLM & RGPD · **EP-08 Accessibilité & i18n** · **EP-09 Scalabilité & Résilience**
- **Tags J4** : `[a11y]` accessibilité RGAA · `[i18n]` internationalisation · `[scale]` scalabilité · `[risk]` résilience
- **MoSCoW** : MUST · SHOULD · COULD · WON'T

---

## MUST — Release 1 (livré S1-S5) ✅

| ID | Epic | Persona | Story | SP | Sprint | Statut |
|----|------|---------|-------|----|--------|--------|
| US-01 | EP-01 | Étudiant·e | Créer un compte par email | 3 | S1 | ✅ |
| US-02 | EP-02 | Étudiant·e | Uploader PDF ou saisir un cours | 5 | S1 | ✅ |
| US-03 | EP-03 | Étudiant·e | Générer 10 QCM en < 60 s | 8 | S2 | ✅ |
| US-04 | EP-04 | Étudiant·e | Soumettre réponses + correction auto | 3 | S3 | ✅ |
| US-05 | EP-04 | Étudiant·e | Score /10 + détail bonnes/mauvaises | 3 | S3 | ✅ |
| US-06 | EP-05 | Étudiant·e | Historique des quizz | 3 | S4 | ✅ |
| US-24 | EP-07 | Tous | `[sécurité]` System prompt défensif OWASP LLM-01 | 2 | S5 | ✅ |
| US-25 | EP-07 | Tous | `[sécurité]` 5 tests adversariaux CI | 3 | S5 | ✅ |
| US-26 | EP-07 | Tous | `[rgpd]` Endpoint export RGPD Art. 15+20 | 3 | S5 | ✅ |
| US-27 | EP-07 | Équipe | `[rgpd]` Politique de rétention documentée | 1 | S5 | ✅ |

**Sous-total MUST R1** : 10 stories · 34 SP · **tous livrés**.

---

## MUST — Release 2 (à livrer S6-S7) 🚧

| ID | Epic | Persona | Story | SP | Sprint |
|----|------|---------|-------|----|--------|
| **US-30** | **EP-08** | **Tous / État** | **`[a11y]` Audit RGAA + correctifs focus visible & contrastes (≥ 4,5:1)** | **8** | **S6** |
| **US-31** | **EP-08** | **Lucia + tous** | **`[a11y]` Navigation clavier complète + alternatives textuelles (alt, title)** | **8** | **S6** |
| **US-32** | **EP-08** | **Lucia + tous** | **`[i18n]` Externaliser les textes UI en fichiers de langue (react-i18next)** | **8** | **S7** |
| **US-34** | **EP-09** | **Tous** | **`[scale]` Test de charge + cache Redis + autoscaling (Kubernetes/Swarm)** | **13** | **S7** |

**Sous-total MUST R2** : 4 stories · 37 SP · à livrer S6-S7.

---

## SHOULD — Release 2 (S6-S7 si vélocité)

| ID | Epic | Persona | Story | SP | Sprint |
|----|------|---------|-------|----|--------|
| US-21 | EP-05 | Mme Lefèvre | Dashboard synthétique de la classe (moyenne, indicateur risque) | 13 | S6 |
| US-22 | EP-05 | Mme Lefèvre | Filtrer et marquer les élèves à suivre | 8 | S6 |
| US-33 | EP-08 | Lucia | `[i18n]` Paramètre de langue du LLM à la volée (`réponds en {langue}`) | 5 | S7 |
| US-35 | EP-09 | Tous | `[scale]` Réplication DB en lecture + backup quotidien automatisé | 8 | S7 |
| US-37 | EP-08 | Lucia + tous | `[a11y]` Support lecteur d'écran + balises ARIA sur quiz et formulaires | 5 | S7 |
| US-07 | EP-01 | Étudiant·e | Réinitialisation mot de passe via email | 3 | S6 |
| US-08 | EP-02 | Étudiant·e | Bibliothèque personnelle des cours uploadés | 5 | S6 |
| US-11 | EP-05 | Étudiant·e | Dashboard de progression par chapitre | 5 | S7 |

**Sous-total SHOULD** : 8 stories · 52 SP.

---

## COULD — Release 2-3 (si vélocité ou budget)

| ID | Epic | Persona | Story | SP | Sprint |
|----|------|---------|-------|----|--------|
| US-23 | EP-05 | Mme Lefèvre | Envoyer message template à 1+ élèves | 8 | S7 |
| US-28 | EP-07 | Équipe | Sanitisation active texte source (Unicode, base64) | 5 | S6 |
| US-29 | EP-07 | Équipe | Table `SARRequest` persistante + purge cron comptes inactifs > 3 ans | 8 | S7 |
| US-36 | EP-09 | Tous | `[scale]` Fournisseur LLM de secours + file d'attente asynchrone | 5 | S8 |
| US-09 | EP-03 | Étudiant·e | Choix niveau de difficulté + nombre de questions | 5 | S7 |
| US-10 | EP-04 | Étudiant·e | Mode timer optionnel par question | 3 | S8 |
| US-13 | EP-01 | Étudiant·e | Login social Google / Apple OAuth | 5 | n.c. |
| US-14 | EP-02 | Étudiant·e | Import cours depuis URL web | 8 | n.c. |
| US-16 | EP-05 | Étudiant·e | Identification automatique des lacunes par chapitre | 8 | n.c. |

**Sous-total COULD** : 9 stories · 55 SP.

---

## WON'T — Release 3+

| ID | Epic | Persona | Story | SP | Justification |
|----|------|---------|-------|----|---------------|
| US-15 | EP-03 | Enseignant·e | Questions ouvertes corrigées par LLM | 13 | Trop incertain (QCM = cœur produit) |
| US-18 | EP-01 | Établissement | SSO SAML/OIDC | 13 | Post-prototype B2B |
| US-19 | EP-03 | Étudiant·e | Chatbot conversationnel | 21 | Hors vision (concurrent Khanmigo) |
| US-20 | EP-04 | Étudiant·e | Mode compétition multi-joueurs | 13 | Hors scope vision initiale |

**Sous-total WON'T** : 4 stories · 60 SP.

---

## Récapitulatif

| Niveau | Stories | SP |
|--------|---------|----|
| MUST R1 (livré) | 10 | 34 |
| MUST R2 (à livrer S6-S7) | 4 | 37 |
| SHOULD | 8 | 52 |
| COULD | 9 | 55 |
| WON'T | 4 | 60 |
| **TOTAL** | **35** | **238** |

## Traçabilité des perturbations

| Perturbation | Stories ajoutées | Δ SP | Périmètre cumulé |
|--------------|-----------------|------|-----------------|
| Cadrage initial (v1.0) | US-01 à US-20 | 100 SP | 100 |
| J1 — persona Mme Lefèvre | US-21, US-22, US-23 | +29 | 129 |
| J3 — Sécurité LLM & RGPD | US-24 à US-29 | +22 | 151 |
| J4 — Passage à l'échelle | US-30 à US-37 | +47 | **198** |
