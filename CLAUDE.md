# Portail de demandes de matériel IT

Projet pédagogique de l'atelier IA DSI (13 octobre 2026). Données entièrement fictives.

## Le produit

Un portail interne où un **demandeur** demande du matériel informatique, un **manager** valide ou refuse, et un **gestionnaire de stock** prépare et livre. Spécifications : `docs/`.

| Epic | Route | Dossier | Groupe |
| --- | --- | --- | --- |
| E0 Socle | `/` | `src/app`, `src/components`, `src/lib` | Animateur |
| E1 Catalogue et demande | `/catalogue` | `src/features/e1-catalogue` | Groupe 1 |
| E2 Validation et suivi | `/validation` | `src/features/e2-validation` | Groupe 2 |
| E3 Stock et livraison | `/stock` | `src/features/e3-stock` | Groupe 3 |

## Stack (ne pas changer)

- Next.js 16 (App Router), React 19, TypeScript strict. Voir aussi `AGENTS.md` : lire la doc de `node_modules/next/dist/docs/` avant d'utiliser une API Next.js.
- Interface : **shadcn/ui** uniquement (composants dans `src/components/ui`). Ne pas inventer de style : réutiliser les composants existants (Button, Card, Badge, Input, Label, Textarea, NativeSelect, Table, Alert).
- Données : `src/data/*.json` + état dans le navigateur via `useStore()` (`src/lib/store.tsx`). Pas de serveur, pas de base de données.
- Modèle métier partagé : `src/lib/domaine.ts` (types, statuts, transitions). **Ne pas le modifier** sans accord explicite de l'animateur : les 3 groupes en dépendent.
- Tests : Vitest (`tests/unit`, ou `*.test.ts` à côté du code) et Playwright (`tests/e2e`).

## Règles de travail

1. **Toujours partir d'une issue GitHub.** Lire l'issue et ses critères d'acceptation avant toute chose.
2. **Planifier avant de coder.** Proposer un plan (fichiers touchés, tests prévus, risques) et attendre la validation humaine. Enregistrer le plan validé dans `docs/plan/<epic>-<numero-issue>.md`.
3. **Rester dans son dossier.** Ne modifier que le dossier de son epic et la page de sa route. Ne pas toucher aux autres epics.
4. **Aucune nouvelle dépendance npm** et aucune modification de `package.json`.
5. **Tests obligatoires.** Chaque critère d'acceptation est couvert par au moins un test. Lancer `npm run verifier` avant de proposer une pull request.
6. **Documentation à jour.** Mettre à jour `docs/guide-utilisateur.md` (skill `mettre-a-jour-doc`).
7. **Git.** Branche `feat/<numero-issue>-<titre-court>`, commits en français, pull request qui contient `Closes #<numero>`. Ne jamais pousser sur `main`.
8. **Interdits.** Aucun secret, mot de passe, jeton ou donnée réelle (nom de client, collaborateur réel) dans le code, les issues ou les commits.
9. **Langue.** Interface, commentaires, commits et documentation en français.

## Commandes

- `npm run dev` : lancer l'application (port 3000)
- `npm run verifier` : lint + types + tests unitaires
- `npm run test:e2e` : tests de bout en bout
