# Note de Decision : Securite LLM et Prompt Injection

**Date :** 30 Juin 2026  
**Objet :** Implementation d'une architecture de defense contre la prompt injection  
**Decision :** Implementation d'une defense multi-couches (4 couches)

## Contexte
Le retour d'experience sur la securite des LLM (OWASP LLM-01) montre que les utilisateurs peuvent injecter des instructions dans le contenu uploadé pour détourner le comportement de l'IA. Pour un outil educatif, cela pourrait mener a la génération de mauvaises réponses ou a la fuite du prompt systeme.

## Options Envisagees
1. Simple filtrage de mots-clés (ex: "ignore instructions").
2. Utilisation d'un second LLM pour valider l'input.
3. Implementation d'une architecture en 4 couches (Structured Prompting, Prompt Défensif, Validation de Sortie, Tests Adversariaux).

## Decision Retenue
L'option 3 est retenue. Nous implementons la defense en 4 couches car elle offre la meilleure robustesse sans ajouter de latence excessive.

## Justification
- La separation System/User empeche la confusion des rôles.
- Le prompt defensif neutralise les injections courantes.
- La validation de sortie garantit que seul un quiz valide est retourné.
- Les tests adversariaux permettent de detecter les regressions en CI/CD.

## Consequences
- Positives : Securite accrue, conformite aux standards OWASP, confiance utilisateur.
- Negatives : Légère augmentation de la complexité du prompt système.
- A surveiller : L'evolution des techniques d'injection qui pourrait nécessiter la mise à jour du jeu de tests adversariaux.
