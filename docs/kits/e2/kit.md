# Kit de rattrapage · E2 Validation et suivi

> À n'utiliser que si le groupe 2 est bloqué à la fin d'une itération : on repart de ce kit et on passe à l'étape suivante.

## 1. Specs de l'epic

Rôle principal : manager. Route : `/validation`. Dossier : `src/features/e2-validation`.

Règles de gestion : une demande suit le cycle Soumise → Validée ou Refusée → En préparation → Livrée (voir `src/lib/domaine.ts`). Les données sont fictives.

## 2. User stories

### E2-1 · Voir les demandes à valider

En tant que manager, je veux voir la liste des demandes soumises, afin de les traiter.

**Critères d'acceptation**

- Étant donné que je suis manager, Quand j'ouvre /validation, Alors je vois les demandes au statut « Soumise » avec demandeur, article, quantité et motif.
- Étant donné qu'il n'y a aucune demande soumise, Alors un message « Rien à valider » s'affiche.

### E2-2 · Valider ou refuser

En tant que manager, je veux valider ou refuser une demande, afin de débloquer ou d'arrêter le traitement.

**Critères d'acceptation**

- Quand je clique sur « Valider », Alors la demande passe au statut « Validée ».
- Quand je clique sur « Refuser », Alors un commentaire est obligatoire et la demande passe au statut « Refusée ».
- Une demande déjà traitée ne propose plus ces boutons.

### E2-3 · Suivre ses demandes

En tant que demandeur, je veux voir le statut de toutes mes demandes, afin de ne plus appeler la DSI.

**Critères d'acceptation**

- Étant donné que je suis demandeur, Quand j'ouvre /validation, Alors je vois toutes les demandes avec leur statut sous forme de badge.
- Une demande refusée affiche le commentaire du manager.

## 3. Priorisation

Story conseillée pour le sprint : **Valider ou refuser**.

## 4. Plan d'implémentation (story conseillée et suivantes)

1. Créer `src/features/e2-validation/liste-a-valider.tsx` : filtre les demandes `soumise` depuis `useStore()`.
2. Ajouter les boutons Valider / Refuser ; le refus ouvre un Textarea de commentaire obligatoire ; utiliser `changerStatut` de `@/lib/domaine`.
3. Créer `src/features/e2-validation/suivi-demandes.tsx` : tableau de toutes les demandes avec `Badge` de statut.
4. Dans `src/app/validation/page.tsx`, afficher la liste à valider si le rôle est manager, le suivi sinon.
5. Tests : `src/features/e2-validation/refus.test.ts` (commentaire obligatoire) et `tests/e2e/e2-validation.spec.ts` (valider une demande soumise en tant que manager).
6. Mettre à jour `docs/guide-utilisateur.md`, section Manager.

## 5. Définition du « fait »

- `npm run verifier` passe
- La CI est verte sur la pull request
- Un membre du groupe a recetté l'écran dans le navigateur
- Le guide utilisateur est à jour
