# Portail de demandes de matériel IT

Projet fil rouge de l'atelier « L'IA générative au service de la DSI » (13 octobre 2026), animé par Little Bird.
**Toutes les données sont fictives.** L'application n'est pas destinée à la production.

## Démarrer en 3 clics (rien à installer)

1. Bouton vert **Code** → onglet **Codespaces** → **Create codespace on main**.
2. Attendre environ une minute : VS Code s'ouvre dans le navigateur et installe tout.
3. Dans le terminal : `npm run dev`, puis cliquer sur **Open in Browser** (port 3000).

Claude Code est préinstallé : icône Claude dans la barre latérale de VS Code, connexion avec votre compte Claude.

## Pour l'atelier

- Règles du projet pour Claude : [`CLAUDE.md`](CLAUDE.md)
- Fiches pas à pas : [`atelier/`](atelier/)
- Spécifications : [`docs/`](docs/)
- Tableau de bord du projet : [`dashboard/`](dashboard/) (publié sur GitHub Pages)

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Lancer l'application |
| `npm run verifier` | Lint, types, tests unitaires |
| `npm run test:e2e` | Tests de bout en bout |
