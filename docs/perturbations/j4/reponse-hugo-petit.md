# Réponse à la demande d'accès RGPD Art. 15 — M. Hugo Petit

**Expéditeur** : Équipe EduTutor IA — Groupe 05 IPSSI
**Destinataire** : M. Hugo Petit (M2 Droit)
**Objet** : Réponse à votre demande d'accès à vos données personnelles (RGPD Art. 15)
**Date d'émission** : 01/07/2026
**Référence dossier** : SAR-2026-07-01-01
**Délai réglementaire de réponse** : 1 mois (Art. 12(3) RGPD) — répondu sous 48 h

---

## Accusé de réception

Monsieur Petit,

Nous accusons réception de votre demande d'accès formulée en application de l'article 15 du Règlement Général sur la Protection des Données (RGPD). Nous vous en remercions et sommes en mesure d'y répondre dans les temps.

Votre demande a été enregistrée sous la référence **SAR-2026-07-01-01** et traitée le 01/07/2026 à 14 h 30.

## Modalités de récupération de vos données

Toutes vos données personnelles sont accessibles en **self-service**, immédiatement et à tout moment, via l'endpoint suivant :

- **URL** : `GET /api/accounts/me/export/`
- **Authentification** : bearer token DRF (obtenu au login `POST /api/accounts/login/`)
- **Format retourné** : JSON (`Content-Type: application/json`) avec en-tête `Content-Disposition: attachment; filename="export-rgpd-user-<id>.json"` (téléchargement direct par le navigateur)

Un bouton « Exporter mes données » est également prévu dans votre page profil (activation planifiée dans la Release 2, sprint 6-7).

## Catégories de données transmises

Le fichier retourné contient les données suivantes, strictement filtrées par votre identifiant utilisateur (`user=request.user`) :

| Catégorie | Contenu |
|-----------|---------|
| Compte utilisateur | id, email, prénom, nom, date d'inscription, statut de vérification email |
| Quizz générés | id, titre, dates création/mise à jour, score, questions associées |
| Questions et réponses | énoncé, options proposées, index de la bonne réponse, index de votre réponse |

Éléments **non inclus** dans la Release 1 et planifiés en Release 2 (Sprints 6-7, transparence) :
- Texte source brut des PDF téléversés (US-28 COULD S6)
- Signalements de contenu (fonctionnalité pas encore livrée, US future)
- Logs d'audit SAR complets (aujourd'hui volatils dans les logs applicatifs, persistance planifiée US-29 COULD S7)

Base légale de l'export : **RGPD Art. 15 (droit d'accès)** et **Art. 20 (portabilité)**. Ces deux articles sont explicitement mentionnés dans le champ `base_legale` du JSON transmis.

## Rappel de vos droits

Conformément au RGPD, vous disposez également des droits suivants, tous exerçables en self-service depuis votre espace :

| Droit | Article | Endpoint | Délai |
|-------|---------|----------|-------|
| Accès | Art. 15 | `GET /api/accounts/me/export/` | Immédiat |
| Rectification | Art. 16 | `PATCH /api/accounts/profile/` | Immédiat |
| Effacement (droit à l'oubli) | Art. 17 | `DELETE /api/accounts/profile/` | Immédiat, hard delete |
| Limitation | Art. 18 | Contact DPO | 72 h |
| Portabilité | Art. 20 | `GET /api/accounts/me/export/` | Immédiat |
| Opposition | Art. 21 | Contact DPO | 30 jours |

## Durées de conservation

Vous trouverez le détail dans notre **politique de rétention** : `docs/legal/politique-retention.md`.

Résumé : vos données sont conservées jusqu'à la suppression de votre compte (Art. 17 en un clic), à l'exception des logs d'audit SAR qui sont conservés 3 ans à des fins de preuve de conformité (obligation légale CNIL).

## Contact DPO et réclamation

- **Délégué à la Protection des Données** : dpo@edututor-ipssi.fr (délégué mutualisé du réseau IPSSI)
- **Adresse postale** : Équipe EduTutor IA — 5 rue Bannier, 45000 Orléans
- **Réclamation CNIL** : en cas de désaccord avec notre traitement, vous pouvez saisir la CNIL directement via www.cnil.fr/plaintes

Nous restons à votre disposition pour toute question complémentaire.

Cordialement,

**Équipe EduTutor IA — Groupe 05 IPSSI**
_Valentin LOUVET · Amine KAOUTAR · Erwann HILLION · Alexandre BONJOUR · Evan AFONSO · Bastien ROUVIERE · Aya SGHAIER_
