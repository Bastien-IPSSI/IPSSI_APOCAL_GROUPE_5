# Persona J4 — Lucia (accessibilité + i18n)

**Perturbation** : J4 — Passage à l'échelle · **Date** : 02/07/2026

---

## Lucia, 17 ans — Lycéenne à Séville, Espagne

**Situation** : Lycéenne en terminale, malvoyante de naissance (acuité visuelle résiduelle ~5 %). Elle utilise un **lecteur d'écran** (NVDA) et navigue exclusivement au **clavier**.

**Langue** : espagnol (maternelle). Niveau B2 en français, mais révise dans sa langue pour maximiser la mémorisation.

**Contexte d'usage** : son lycée a adopté EduTutor après l'annonce de l'État français. Elle est enthousiaste mais découvre une application franco-française inaccessible et non traduite.

### Objectifs
- Réviser ses cours (histoire, sciences) en espagnol avec des QCM pertinents.
- Naviguer de A à Z sans souris (focus visible, ordre logique des éléments).
- Comprendre l'interface, les messages d'erreur et les corrections de quiz.

### Besoins
- **Interface traduite** en espagnol (menu, boutons, messages d'erreur, corrections).
- **Quiz générés en espagnol** (LLM qui répond dans la langue du contenu uploadé).
- **Navigation 100 % clavier** : Tab, Shift+Tab, Enter, espace, flèches.
- **Contrastes suffisants** : ratio ≥ 4,5:1 (WCAG 2.1 niveau AA).
- **Alternatives textuelles** sur toutes les icônes et images.
- **Balises ARIA** sur les éléments interactifs pour que le lecteur d'écran les annonce correctement.

### Frustrations actuelles
- « L'interface est entièrement en français — les messages d'erreur aussi. »
- « Avec mon lecteur d'écran, le bouton 'Générer un quiz' n'est pas annoncé, c'est juste un carré cliquable sans nom. »
- « Les contrastes entre le texte gris et le fond blanc clair sont insuffisants — je ne distingue pas les options de réponse. »
- « Quand j'uploade un cours en espagnol, le quiz généré revient en français. »

### Expérience tech
- Experte NVDA + navigation clavier.
- Utilisatrice iOS avec VoiceOver sur iPhone.
- Pas développeuse, attend une interface intuitive et accessible.

### Axes J4 nourris par ce persona

| Axe | Stories impactées |
|-----|------------------|
| `[a11y]` | US-30 (contrastes), US-31 (navigation clavier), US-37 (ARIA + lecteur écran) |
| `[i18n]` | US-32 (externalisation textes), US-33 (LLM langue à la volée) |

### Customer Journey Lucia

| Étape | Action | Pensée | Émotion |
|-------|--------|--------|---------|
| Découverte | Son lycée l'inscrit sur EduTutor | « Enfin un outil de révision IA ! » | Enthousiasme |
| Connexion | Tente de naviguer à la clavier | « Tab ne fonctionne pas, le focus est invisible » | Frustration |
| Upload cours | Upload PDF de chimie en espagnol | « Ça a l'air de marcher… » | Espoir |
| Génération quiz | Le quiz revient en français | « Mes questions sont en français alors que mon cours était en espagnol » | Déception |
| Réponses | Le lecteur d'écran ne lit pas les options | « Je ne sais même pas si je clique au bon endroit » | Abandon |
| Idéal post-J4 | Navigation clavier, quiz en espagnol, lecteur d'écran fonctionnel | « EduTutor est vraiment utilisable pour moi » | Accomplissement |
