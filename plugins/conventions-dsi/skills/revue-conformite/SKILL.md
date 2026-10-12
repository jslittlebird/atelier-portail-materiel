---
name: revue-conformite
description: Relit une pull request ou une branche selon les règles de la DSI (périmètre, tests, secrets, dépendances, documentation) et produit un rapport court.
---

Relis les modifications de la branche courante par rapport à `main` (`git diff main...HEAD`) et vérifie :

1. **Périmètre** : les fichiers modifiés restent dans le dossier de l'epic concerné (voir `CLAUDE.md`).
2. **Tests** : chaque critère d'acceptation de l'issue liée a au moins un test.
3. **Secrets et données** : aucun mot de passe, jeton, clé, adresse e-mail ou nom réel.
4. **Dépendances** : `package.json` et `package-lock.json` n'ont pas changé.
5. **Documentation** : `docs/guide-utilisateur.md` est à jour.

Rends un tableau : règle, statut (conforme / à corriger), preuve (fichier et ligne). Termine par une recommandation : fusionner, ou corriger d'abord.
