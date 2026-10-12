# Plan · Compteurs de demandes sur l'accueil (E0)

Issue : « Afficher des compteurs de demandes sur la page d'accueil ».

| Étape | Fichier | Critère couvert |
| --- | --- | --- |
| 1. Fonction de comptage pure, tous statuts présents | `src/features/e0-accueil/compteurs.ts` | 1, 3 |
| 2. Tests unitaires du comptage | `src/features/e0-accueil/compteurs.test.ts` | 1, 3 |
| 3. Composant de cartes (shadcn Card), lit le store | `src/features/e0-accueil/compteurs-demandes.tsx` | 1, 2 |
| 4. Insertion dans l'accueil | `src/app/page.tsx` | 1 |
| 5. Test de bout en bout | `tests/e2e/accueil-compteurs.spec.ts` | 1 |
| 6. Guide utilisateur et journal | `docs/` | — |

Risques : aucun changement du modèle partagé ni de dépendance. Le critère 2 (mise à jour en direct) est assuré par le store React.
