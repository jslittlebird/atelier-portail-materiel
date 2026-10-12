---
name: mettre-a-jour-doc
description: Met à jour le guide utilisateur (docs/guide-utilisateur.md) après une modification fonctionnelle. À utiliser avant chaque pull request qui change ce que voit un utilisateur.
---

Mets à jour `docs/guide-utilisateur.md` pour refléter les changements de la branche courante.

1. Lis le diff de la branche par rapport à `main` (`git diff main...HEAD`) et l'issue liée.
2. Identifie ce qui change pour l'utilisateur final (demandeur, manager ou gestionnaire de stock).
3. Mets à jour uniquement la section du rôle concerné dans le guide : phrases courtes, à l'impératif, sans jargon technique.
4. Si un écran nouveau apparaît, ajoute une ligne dans le tableau « Où trouver quoi ».
5. Ajoute une ligne datée dans `docs/journal-des-changements.md` : date, numéro d'issue, une phrase.
6. N'invente aucune fonctionnalité : ne documente que ce qui est dans le code.
