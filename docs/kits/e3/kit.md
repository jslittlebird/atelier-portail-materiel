# Kit de rattrapage · E3 Stock et livraison

> À n'utiliser que si le groupe 3 est bloqué à la fin d'une itération : on repart de ce kit et on passe à l'étape suivante.

## 1. Specs de l'epic

Rôle principal : gestionnaire de stock. Route : `/stock`. Dossier : `src/features/e3-stock`.

Règles de gestion : une demande suit le cycle Soumise → Validée ou Refusée → En préparation → Livrée (voir `src/lib/domaine.ts`). Les données sont fictives.

## 2. User stories

### E3-1 · Voir l'état du stock

En tant que gestionnaire de stock, je veux voir le stock de chaque article et ceux en alerte, afin d'anticiper les ruptures.

**Critères d'acceptation**

- Quand j'ouvre /stock, Alors je vois chaque article avec son stock et son seuil d'alerte.
- Un article dont le stock est inférieur ou égal au seuil est mis en évidence « Alerte ».
- Un compteur indique le nombre d'articles en alerte.

### E3-2 · Préparer une demande validée

En tant que gestionnaire de stock, je veux passer une demande validée en préparation, afin que l'équipe sache qu'elle est prise en charge.

**Critères d'acceptation**

- Étant donné une demande « Validée », Quand je clique sur « Préparer », Alors elle passe « En préparation ».
- Si le stock de l'article est insuffisant, Alors le bouton est désactivé et un message l'explique.

### E3-3 · Livrer

En tant que gestionnaire de stock, je veux marquer une demande comme livrée, afin de clore la demande.

**Critères d'acceptation**

- Étant donné une demande « En préparation », Quand je clique sur « Livrer », Alors elle passe « Livrée ».
- Seules les demandes en préparation proposent ce bouton.

## 3. Priorisation

Story conseillée pour le sprint : **Voir l'état du stock**.

## 4. Plan d'implémentation (story conseillée et suivantes)

1. Créer `src/features/e3-stock/etat-stock.tsx` : Table shadcn du catalogue, `Badge` « Alerte » via `enAlerte` de `@/lib/domaine`, compteur en tête.
2. Créer `src/features/e3-stock/a-preparer.tsx` : demandes `validee` et `en_preparation` avec boutons Préparer / Livrer via `changerStatut`.
3. Dans `src/app/stock/page.tsx`, afficher les deux composants.
4. Tests : `src/features/e3-stock/alerte.test.ts` (compteur d'alertes) et `tests/e2e/e3-stock.spec.ts` (le casque apparaît en alerte).
5. Mettre à jour `docs/guide-utilisateur.md`, section Gestionnaire de stock.

## 5. Définition du « fait »

- `npm run verifier` passe
- La CI est verte sur la pull request
- Un membre du groupe a recetté l'écran dans le navigateur
- Le guide utilisateur est à jour
