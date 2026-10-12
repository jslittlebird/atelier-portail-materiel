# Kit de rattrapage · E1 Catalogue et demande

> À n'utiliser que si le groupe 1 est bloqué à la fin d'une itération : on repart de ce kit et on passe à l'étape suivante.

## 1. Specs de l'epic

Rôle principal : demandeur. Route : `/catalogue`. Dossier : `src/features/e1-catalogue`.

Règles de gestion : une demande suit le cycle Soumise → Validée ou Refusée → En préparation → Livrée (voir `src/lib/domaine.ts`). Les données sont fictives.

## 2. User stories

### E1-1 · Consulter le catalogue

En tant que demandeur, je veux voir le catalogue du matériel disponible, afin de choisir ce dont j'ai besoin.

**Critères d'acceptation**

- Étant donné que j'ouvre /catalogue, Alors je vois chaque article avec son nom, sa catégorie, son stock et son délai de livraison.
- Étant donné un article dont le stock est à 0, Alors il est marqué « Indisponible » et reste consultable.

### E1-2 · Filtrer par catégorie

En tant que demandeur, je veux filtrer le catalogue par catégorie, afin de trouver vite le bon matériel.

**Critères d'acceptation**

- Quand je choisis la catégorie « Écran », Alors seuls les écrans s'affichent.
- Quand je choisis « Toutes les catégories », Alors tous les articles s'affichent.

### E1-3 · Créer une demande

En tant que demandeur, je veux demander un article avec une quantité et un motif, afin que ma demande soit traitée.

**Critères d'acceptation**

- Étant donné un article, Quand je saisis une quantité entre 1 et 5 et un motif d'au moins 10 caractères et que je valide, Alors une demande au statut « Soumise » est créée.
- Quand le motif est vide ou trop court, Alors un message d'erreur s'affiche et la demande n'est pas créée.
- Après création, Alors je vois un message de confirmation avec le numéro de la demande.

## 3. Priorisation

Story conseillée pour le sprint : **Créer une demande** (la plus visible).

## 4. Plan d'implémentation (story conseillée et suivantes)

1. Créer `src/features/e1-catalogue/liste-catalogue.tsx` (composant client, Table shadcn) qui lit `catalogue` depuis `@/lib/domaine`.
2. Ajouter un filtre par catégorie avec `NativeSelect`.
3. Créer `src/features/e1-catalogue/formulaire-demande.tsx` : quantité (Input number), motif (Textarea), validation, puis ajout via `setDemandes` du store avec `prochainId` et le statut `soumise`.
4. Remplacer `AConstruire` dans `src/app/catalogue/page.tsx` par ces composants.
5. Tests : `src/features/e1-catalogue/validation-demande.test.ts` (règles quantité / motif) et `tests/e2e/e1-catalogue.spec.ts` (créer une demande de bout en bout).
6. Mettre à jour `docs/guide-utilisateur.md`, section Demandeur.

## 5. Définition du « fait »

- `npm run verifier` passe
- La CI est verte sur la pull request
- Un membre du groupe a recetté l'écran dans le navigateur
- Le guide utilisateur est à jour
