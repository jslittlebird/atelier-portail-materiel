# ADR 0001 : choix de la stack

- **Statut** : accepté, 12/10/2026
- **Contexte** : un projet d'atelier qui doit tourner sans installation, être lisible par des non-développeurs et être construit par 3 groupes en parallèle en 45 minutes.
- **Décision** : Next.js 16 + shadcn/ui, données JSON et état navigateur, exécution dans GitHub Codespaces, un dossier par epic.
- **Conséquences** : aucune base de données ni authentification réelle ; l'application n'est pas destinée à la production. Les conflits entre groupes sont évités par des dossiers séparés et un modèle partagé figé (`src/lib/domaine.ts`).
