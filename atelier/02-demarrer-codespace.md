# Démarrer son Codespace (référents de groupe)

**À faire dès 14h00**, pendant la restitution du matin : le démarrage prend 1 à 2 minutes.

## 1. Ouvrir le Codespace

1. Ouvrir le dépôt sur GitHub (lien donné par l'animateur), connecté à votre compte GitHub.
2. Bouton vert **Code** → onglet **Codespaces** → **Create codespace on main**.
3. Attendre : VS Code s'ouvre dans le navigateur et installe les dépendances (`npm ci`) tout seul.

✅ Le terminal en bas affiche l'invite sans erreur.

## 2. Lancer l'application

Dans le terminal : `npm run dev`, puis cliquer sur **Open in Browser** quand la notification apparaît (ou onglet **Ports** → icône globe du port 3000).

✅ Le portail s'affiche, avec le menu « Je suis ».

## 3. Connecter Claude Code

1. Dans la barre latérale de VS Code, cliquer sur l'icône **Claude** (extension préinstallée).
2. Se connecter avec son **compte Claude** de l'entreprise (une page s'ouvre dans le navigateur, valider, revenir).
3. Taper : `Lis CLAUDE.md et résume-moi les règles de ce projet en 5 points.`

✅ Claude répond en citant les règles du projet.

## Les 4 gestes à connaître

| Geste | Comment |
| --- | --- |
| Mode plan (Claude propose sans modifier) | Choisir **Plan** dans le sélecteur de mode du panneau Claude |
| Accepter ou refuser une modification | Claude affiche l'avant / après : **Accepter** ou **Refuser** fichier par fichier |
| Voir l'application | Onglet **Ports** → globe du port 3000 |
| Tout vérifier avant une pull request | Demander à Claude : `Lance npm run verifier et corrige ce qui échoue.` |

## En cas de problème

| Symptôme | Que faire |
| --- | --- |
| Le Codespace ne démarre pas | Recharger la page ; sinon prévenir l'animateur (réseau) |
| La connexion Claude échoue | Vérifier qu'on utilise le compte Claude de l'entreprise ; sinon travailler sur le poste de l'animateur |
| `npm run dev` affiche une erreur | La copier à Claude : `Voici l'erreur, explique-la et corrige-la.` |
