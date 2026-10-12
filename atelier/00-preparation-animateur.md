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
- [ ] Branche `demo/compteurs-accueil` prête pour la démo de 14h10

## La démo de 14h10 (25 min)

1. **En direct** : dans le Projet Claude, faire rédiger la story « compteurs sur l'accueil » et ses critères ; montrer l'issue correspondante (créée par le script).
2. **En direct** : Claude Code en mode Plan sur cette issue → plan relu.
3. **Déjà fait** : `git switch demo/compteurs-accueil` → montrer le code, les tests, le plan dans `docs/plan/`, la doc mise à jour ; ouvrir la pull request depuis cette branche → la CI tourne.
4. Montrer le tableau de bord qui reflète l'issue et la pull request.
