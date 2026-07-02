# Note de décision MoSCoW — Perturbation J4 (Passage à l'échelle)

**Auteur** : Équipe 05 (Valentin LOUVET · Amine KAOUTAR · Erwann HILLION · Alexandre BONJOUR · Evan AFONSO · Bastien ROUVIERE · Aya SGHAIER)
**Date** : 02/07/2026
**Version** : v1.0
**Statut** : Livré avant jeudi 17h (deadline Direction Générale)

## Contexte

Suite à un passage télé, l'application atteint des millions d'utilisateurs. La Direction Générale reçoit deux annonces simultanées :

1. **L'État français veut adopter EduTutor comme plateforme de référence** pour tous les lycées — condition non négociable : respecter la norme **RGAA** (accessibilité service public, WCAG 2.1 niveau AA).
2. **La levée de fonds est bouclée** — budget pour internationaliser (i18n), migrer vers une architecture scalable et résiliente, et absorber la charge nationale.

Trois axes structurent la perturbation J4 :
- **[a11y]** Accessibilité RGAA (obligation légale, marché État)
- **[i18n]** Internationalisation (expansion levée de fonds)
- **[scale]** Scalabilité & résilience (millions d'utilisateurs)

## Décisions retenues

### Axe [a11y] — Accessibilité RGAA

| Story | MoSCoW | Sprint | Justification |
|-------|--------|--------|---------------|
| US-30 Audit RGAA + focus & contrastes | **MUST** | S6 | Contrat État = RGAA obligatoire ; contrastes + focus = critères bloquants WCAG |
| US-31 Navigation clavier + alternatives textuelles | **MUST** | S6 | Navigation clavier = WCAG 2.1 SC 2.1.1 (niveau A, non négociable) |
| US-37 Lecteur d'écran + ARIA | **SHOULD** | S7 | Fort impact accessibilité, mais non bloquant pour la signature initiale |

**Différé (COULD, S8+)** : Audit RGAA complet par tiers indépendant, certification officielle.

### Axe [i18n] — Internationalisation

| Story | MoSCoW | Sprint | Justification |
|-------|--------|--------|---------------|
| US-32 Externaliser les textes (fichiers de langue) | **MUST** | S7 | Prérequis technique de toute traduction — sans ça, l'i18n est impossible |
| US-33 Paramètre de langue du LLM à la volée | **SHOULD** | S7 | Valeur forte pour Lucia (lycéenne espagnole) ; dépend de US-32 |

**Différé (COULD, S8+)** : Traductions EN/ES/DE complètes, détection automatique de langue du navigateur.

### Axe [scale] — Scalabilité & Résilience

| Story | MoSCoW | Sprint | Justification |
|-------|--------|--------|---------------|
| US-34 Test de charge + cache Redis + autoscaling | **MUST** | S7 | Servers ont failli tomber hier — risque critique (expo 9/9 en matrice risques) |
| US-35 Réplication DB + backup quotidien | **SHOULD** | S7 | Protection données en cas de panne ; RPOCRIT < 24h |
| US-36 Fournisseur LLM de secours | **COULD** | S8 | Résilience multi-fournisseur ; différé car migration Groq prévue |

## Analyse capacité

- **Vélocité observée** : ~20 SP/sprint (sprints S1-S5).
- **Charge J4** : 8 nouvelles stories = **60 SP** (+47 SP MUST/SHOULD en S6-S7).
- **Capacité S6-S7** : 2 sprints × ~28 SP = 56 SP disponibles.
- **Écart** : +4 SP → US-35 et US-33 passent en SHOULD pour ajustement si vélocité < 28 SP/sprint.

## Persona ajoutée

**Lucia, 17 ans, lycéenne à Séville, malvoyante** — utilise un lecteur d'écran, révise en espagnol. Nourrit directement les axes a11y + i18n. Voir `persona-lucia.md`.

## Différé documenté (noir sur blanc pour le PO)

| Story | Raison du report |
|-------|-----------------|
| Audit RGAA tiers indépendant | Coût élevé (5-15k€), nécessite 2 sprints de correctifs d'abord |
| Traductions EN/ES/DE complètes | Dépend de US-32 (externalisation) — livrable S8+ |
| Détection automatique langue navigateur | UX nice-to-have, après les bases i18n |
| Certification WCAG officielle | Après audit tiers — R3+ |

## Validation

| Rôle | Nom | Décision |
|------|-----|----------|
| Product Owner (externe) | _à renseigner_ | _en attente revue_ |
| Scrum Master | _à désigner_ | _en attente revue_ |
| Équipe (7 membres) | Équipe 05 | Consensus atteint en cadrage J4, 02/07/2026 |
