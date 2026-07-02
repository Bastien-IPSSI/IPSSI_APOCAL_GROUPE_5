# Pilotage J4 — Burndown Sprint S6 & Burnup Projet

**Équipe** : 05 · **Date** : 02/07/2026 · **Version** : v1.0

---

## 1. Burndown — Sprint S6 (actuel)

**Contexte Sprint S6** : premier sprint post-MVP, jeudi matin. Focus : US-30 et US-31 (RGAA MUST) + US-21 et US-22 (enseignant SHOULD J1).

**Capacité S6** : équipe 7 personnes × demi-journée = ~28 SP engagés.

**Stories engagées S6** :

| Story | Tag | SP | Statut J0 |
|-------|-----|----|-----------|
| US-30 Audit RGAA + focus/contrastes | [a11y] | 8 | À faire |
| US-31 Navigation clavier + alt textuelles | [a11y] | 8 | À faire |
| US-21 Dashboard classe | — | 8 | À faire (tronqué : 13 SP → 8 SP en S6) |
| US-22 Filtre & marquer élèves | — | 4 | À faire (tronqué : 8 SP → 4 SP en S6) |
| **Total engagé** | | **28** | |

**Burndown Sprint S6** (reste à faire en SP, mise à jour journalière) :

```
SP restants
28 │●
   │  \  ← ligne idéale
24 │    ●
   │      \
18 │        ●
   │    ligne réelle → à compléter chaque soir par le SM
12 │
   │
 6 │
   │
 0 └──────────────────────────────────────
   J0    J1    J2    J3    J4   (jeudi soir)
```

| Jour | Idéal (SP restants) | Réel (SP restants) | Delta |
|------|--------------------|--------------------|-------|
| J0 (jeudi matin) | 28 | 28 | 0 |
| J1 (jeudi 12h) | 21 | _à remplir_ | — |
| J2 (jeudi 15h) | 14 | _à remplir_ | — |
| J3 (jeudi 17h — revue) | 7 | _à remplir_ | — |
| J4 (fin sprint) | 0 | _à remplir_ | — |

> **Lecture** : si la ligne réelle est AU-DESSUS de l'idéale, le sprint est en retard. Action : renégocier le périmètre avec le PO ou ajouter une ressource ciblée.

---

## 2. Burnup — Projet (Sprints S1 → S8 projeté)

Le burnup répond à **« le projet va-t-il finir, alors que le périmètre bouge ? »**

- **Ligne verte (Réalisé)** : SP cumulés livrés sprint après sprint (monte).
- **Ligne rouge (Périmètre total)** : scope total du backlog (monte à chaque perturbation).

**Données chiffrées** :

| Sprint | Périmètre total (SP) | SP réalisés cumulés | Δ périmètre |
|--------|---------------------|---------------------|-------------|
| S0 (cadrage) | 100 | 0 | — |
| S1 | 100 | 20 | — |
| S2 | 100 | 40 | — |
| S3 | 100 | 60 | — |
| S4 — perturbation J1 (+29 SP) | **129** | 78 | **+29** |
| S5 — perturbation J3 (+22 SP) | **151** | 100 | **+22** |
| S6 — perturbation J4 (+47 SP) | **198** | ~128 | **+47** |
| S7 (projeté) | 198 | ~156 | — |
| S8 (projeté) | 198 | ~184 | — |

```
SP
200 │                                    ●───── Périmètre total (rouge)
    │                               ●
150 │                          ●                         ● Réalisé cumulé (vert)
    │                      ●                        ●
100 │                  ●                       ●
    │              ●               ●
 50 │          ●               ●
    │      ●               ●
  0 └──────────────────────────────────────────────────
      S0   S1   S2   S3   S4   S5   S6   S7   S8
           MVP↑              ↑J1  ↑J3  ↑J4
```

**Indicateurs de pilotage** :
- Vélocité moyenne : **~20 SP/sprint** (S1-S5).
- SP restants après S5 : 198 − 100 = **98 SP** à livrer.
- Sprints nécessaires à vélocité constante : 98 ÷ 20 = **4,9 sprints** → fin prévue **S10**.
- Impact J4 : +47 SP déplacent la date de fin de **~2,3 sprints** (de S8 à S10).

> **Décision recommandée** : avec la levée de fonds, augmenter l'équipe de 2 personnes = vélocité cible 28 SP/sprint → fin **S8** atteinte.

---

## 3. Alerte pilotage

| Indicateur | Cible | Seuil d'alerte | Action |
|------------|-------|---------------|--------|
| Vélocité S6 | ≥ 20 SP | < 15 SP | Réduire périmètre S6 : reporter US-21 en S7 |
| Taux RGAA critique (Lighthouse) | ≥ 90 % | < 70 % | Bloquer le déploiement contractuel État |
| Latence p95 génération quiz | < 15 s (avec GPU) | > 30 s | Activer cache Redis + async queue |
| Coût cloud journalier | < 50 €/j | > 80 €/j | Alerte budget, réduire instance size |
