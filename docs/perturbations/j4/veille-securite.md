# Document de veille sécurité — Prompt Injection (OWASP LLM-01)

**Équipe** : 05 (Valentin LOUVET · Amine KAOUTAR · Erwann HILLION · Alexandre BONJOUR · Evan AFONSO · Bastien ROUVIERE · Aya SGHAIER)
**Rédacteur** : Chef de projet — Équipe 05
**Date** : 01/07/2026
**Version** : v1.0
**Statut** : Livré Sprint 5 — partagé PO / équipe
**Périmètre** : perturbation J3 « Prompt Injection ». Ce document accompagne la [note de sécurité](security-note.md) et la [note de décision MoSCoW](decision-moscow.md).

## 1. Objet et méthode de veille

Ce document trace la **veille technique et réglementaire** menée par le chef de projet sur la vulnérabilité de type *Prompt Injection* appliquée au générateur de quiz d'EduTutor IA (Llama 3.1 8B via Ollama). Objectif : documenter l'état de l'art, les sources suivies, et alimenter les décisions d'architecture de sécurité prises en Sprint 5.

**Cadence** : veille ponctuelle déclenchée par la perturbation J3 (01/07/2026 10h00), à pérenniser en veille continue mensuelle en Release 2.

**Méthode** : suivi des référentiels officiels (OWASP, ANSSI, NIST, CNIL), des bulletins d'éditeurs (Anthropic, OpenAI, Google), et des publications de recherche sur les attaques LLM. Chaque source est qualifiée par sa fiabilité et sa fraîcheur.

## 2. Sources suivies

| Source | Type | Ce qu'on y surveille | Fiabilité |
|--------|------|----------------------|-----------|
| [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Référentiel | Classement des risques LLM, LLM-01 Prompt Injection | Référence |
| [OWASP GenAI Security Project](https://genai.owasp.org/) | Référentiel | Guides de mitigation, cheat sheets | Référence |
| [NIST AI RMF / AI 600-1](https://www.nist.gov/itl/ai-risk-management-framework) | Cadre | Gouvernance du risque IA générative | Institutionnel |
| [ANSSI — Recommandations de sécurité IA générative](https://cyber.gouv.fr/) | Cadre national | Bonnes pratiques déploiement IA | Institutionnel |
| [MITRE ATLAS](https://atlas.mitre.org/) | Base de connaissances | Tactiques & techniques d'attaque adverses sur l'IA | Référence |
| Bulletins éditeurs (Anthropic, OpenAI, Google DeepMind) | Documentation fournisseur | Guides « prompt injection defense », system prompts | Élevée |
| [Simon Willison — blog / weblog LLM security](https://simonwillison.net/tags/prompt-injection/) | Veille expert | Nouveaux vecteurs, PoC publics | Élevée (à recouper) |

## 3. Synthèse de l'état de l'art

### 3.1 Définition et classification (OWASP LLM-01:2025)

La **Prompt Injection** est classée **n°1 du Top 10 OWASP LLM 2025**. Elle survient lorsqu'une entrée utilisateur altère le comportement du modèle d'une façon non voulue par le concepteur. Deux familles :

- **Injection directe** : l'utilisateur écrit lui-même la charge dans son prompt (« ignore les instructions précédentes… »).
- **Injection indirecte** : la charge est cachée dans un contenu tiers ingéré par le modèle (page web, e-mail, **document PDF**). C'est **exactement notre vecteur** : un PDF de cours piégé.

### 3.2 Vecteurs recensés pertinents pour EduTutor IA

| Vecteur | Description | Applicable à notre PDF ? |
|---------|-------------|--------------------------|
| Injection en clair | Instruction lisible dans le texte source | ✅ Oui |
| Texte blanc-sur-blanc / invisible | Charge camouflée (couleur, taille 0, hors-écran) | ✅ **Vecteur du brief J3** |
| Encodage base64 / ROT13 | Charge encodée pour contourner un filtre naïf | ✅ Oui |
| Injection multilingue | Instruction dans une autre langue que la consigne | ✅ Oui |
| Homoglyphes Unicode | Caractères visuellement identiques (cyrillique/latin) | ✅ Oui |
| Payload splitting | Charge découpée sur plusieurs segments | ⚠️ Possible sur PDF multi-pages |

### 3.3 Incidents et tendances marquants

- **Injection indirecte via documents** : reconnue comme le vecteur le plus difficile à détecter car l'attaquant et la victime (l'utilisateur qui uploade) peuvent être distincts. Un enseignant relisant le PDF à l'œil nu ne voit pas une charge blanc-sur-blanc.
- **Sanction CNIL / RGPD** : les manquements de conformité sur les traitements de données (cf. amende Klarna 1,2 M€ citée en note de décision) rappellent que la sécurité LLM et la conformité RGPD sont désormais traitées conjointement par les régulateurs.
- **Consensus industrie** : il n'existe **aucune solution unique** contre la prompt injection. La défense est nécessairement **en profondeur** (defense-in-depth), combinant séparation des rôles, prompt système défensif, validation de sortie et supervision humaine.

## 4. Contre-mesures recommandées par l'état de l'art

| Contre-mesure (OWASP / NIST) | Statut EduTutor IA | Référence interne |
|------------------------------|--------------------|-------------------|
| Séparation stricte instructions / données | ✅ Implémenté (couche 1) | [security-note.md](security-note.md) §Couche 1 |
| Instruction défensive dans le system prompt | ✅ Implémenté (couche 2) | US-24 |
| Validation & contraintes strictes sur la sortie | ✅ Implémenté (couche 3) | `parse_and_validate_quiz()` |
| Tests adversariaux automatisés en CI | ✅ Implémenté (couche 4) | US-25, [scenario-test.md](scenario-test.md) |
| Sanitisation active du texte source | ⏳ Différé COULD | US-28 (Sprint 6) |
| Rate-limiting des endpoints IA | ⏳ Différé | Sprint 6 |
| Monitoring / alerte sur pics d'échecs | ⏳ Différé | Sprint 7 (Sentry) |
| Least privilege sur les actions déclenchées par le LLM | ✅ N/A — le LLM ne fait que générer du JSON, aucune action système | — |
| Human-in-the-loop pour actions sensibles | ✅ N/A — pas d'action automatique post-génération | — |

## 5. Recommandations du chef de projet

1. **Court terme (Sprint 5, fait)** : livrer les 4 couches de défense et les 5 tests adversariaux en CI. La validation de sortie (couche 3) est le rempart le plus fiable car indépendant de la robustesse du modèle.
2. **Moyen terme (Sprint 6-7)** : prioriser la **sanitisation active** (US-28) et le **rate-limiting**, qui couvrent les angles morts identifiés en veille (charge encodée + attaques automatisées en volume).
3. **Gouvernance** : pérenniser cette veille en **rituel mensuel** (revue OWASP GenAI + bulletins éditeurs) et ajouter un point « sécurité LLM » à la Definition of Done.
4. **Conformité** : maintenir le traitement conjoint sécurité LLM ↔ RGPD (cf. [politique-retention.md](politique-retention.md)), les deux exigences ayant été déclenchées le même jour (J3 / J3-bis).

## 6. Références

- OWASP Top 10 for LLM Applications 2025 — LLM-01 Prompt Injection.
- OWASP GenAI Security Project — Prompt Injection mitigation guidance.
- NIST AI Risk Management Framework (AI RMF 1.0) et NIST AI 600-1 (Generative AI Profile).
- MITRE ATLAS — Adversarial Threat Landscape for AI Systems.
- ANSSI — recommandations de sécurité pour les systèmes d'IA générative.
