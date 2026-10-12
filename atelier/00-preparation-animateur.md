# Préparation de l'animateur

## Mise en ligne du dépôt (une fois)

```bash
# depuis le dossier du dépôt, gh connecté à ton compte
gh repo create indra-atelier-portail-materiel --public --source . --push
git push origin demo/compteurs-accueil
./scripts/initialiser-github.sh
```

Puis sur GitHub :
1. **Settings → Pages → Source : GitHub Actions** (publie le tableau de bord `dashboard/`).
2. **Settings → Codespaces → Prebuild configuration** sur `main` (démarrage plus rapide).
3. **Settings → Branches → règle sur `main`** : pull request obligatoire, CI verte obligatoire.
4. **Projects → New project → Board** « Sprint 1 », colonnes Backlog, Prêt, En cours, En revue, Fait ; ajouter les issues.
5. Inviter les participants (**Settings → Collaborators**) une fois leurs identifiants reçus.

## Le matin du 13

- [ ] LM Studio lancé, modèle GGUF chargé, serveur démarré ; page de démo testée
- [ ] Tableau de bord ouvert : `https://<compte>.github.io/indra-atelier-portail-materiel/`
- [ ] Un Codespace ouvert sur son poste, Claude Code connecté
- [ ] Branche `demo/compteurs-accueil` prête pour la démo de 14h20 ; skill `rediger-user-story` importé dans son compte Claude

## La démo de 14h20 (20 min) : les mêmes étapes que les groupes, en accéléré

Préparé avant : le skill `rediger-user-story` importé dans le compte Claude de l'animateur ; l'issue « Afficher des compteurs de demandes sur la page d'accueil » (créée par le script) ; la branche `demo/compteurs-accueil`.

1. **Étape 0 (2 min, préparé)** : montrer le skill dans Paramètres › Capacités, lire sa description.
2. **Étape 1 (4 min, en direct)** : dans un Projet, « rédige la user story des compteurs » → le skill s'active.
3. **Étape 2 (6 min, en direct)** : l'issue dans GitHub, puis Claude Code en mode Plan sur cette issue → plan relu.
4. **Étape 3 (4 min, préparé)** : `git switch demo/compteurs-accueil` → le code, les tests, le plan dans `docs/plan/`, la doc ; la pull request et la CI.
5. **Revue (4 min, en direct)** : fusionner, l'issue se ferme, le tableau de bord bouge.
