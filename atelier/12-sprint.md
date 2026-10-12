# Sprint · Faire réaliser, en gardant la main

**Durée** : 45 minutes (15h35 → 16h20) · **Où** : Claude Code dans le Codespace · **Au clavier** : le référent ; **en recette** : les autres membres.

## Le principe

Claude Code écrit le code ; **vous décidez**. Comme un chef de projet face à un prestataire : vous relisez, vous acceptez ou refusez, vous testez.

## Pas à pas

**1. Lancer la réalisation (5 min)** · repasser en mode normal (sortir du mode Plan), puis :

```
Réalise le plan docs/plan/E[n]-[numéro].md, étape par étape.
Après chaque étape, montre-moi ce que tu as modifié et attends mon accord.
```

**2. Relire chaque modification (20 min)**
- Lisez l'avant / après de chaque fichier. Pas besoin de tout comprendre : vérifiez que **le fichier est dans votre dossier** et que **le texte affiché à l'écran est en français**.
- **Accepter** ou **Refuser** avec une raison : `Refusé : ce fichier appartient au groupe 2.`

**3. Recetter dans le navigateur (10 min)** · la recette est faite par un membre **qui n'a pas tenu le clavier**.
- Onglet **Ports** → globe du port 3000 (relancer `npm run dev` si besoin).
- Choisir le bon rôle dans « Je suis », puis dérouler **chaque critère d'acceptation** de l'issue.
- Un écart ? Le dire à Claude : `Critère 2 non respecté : [ce que vous observez]. Corrige.`

**4. Vérifier et documenter (5 min)**

```
Lance npm run verifier et corrige ce qui échoue.
Puis utilise le skill mettre-a-jour-doc pour mettre à jour le guide utilisateur.
```

**5. Ouvrir la pull request (5 min)**

```
Commite, pousse la branche et ouvre une pull request avec gh :
titre clair, "Closes #[numéro]" dans la description, label "groupe:[n]".
```

Ouvrez la pull request sur GitHub et regardez la **CI** démarrer (onglet **Checks**).

## ✅ Checkpoint 6c

- [ ] Une pull request est ouverte et liée à l'issue
- [ ] La CI est verte, ou l'échec est compris et expliqué
- [ ] La recette a été faite par un membre du groupe

**Le temps file ?** Une pull request incomplète mais honnête vaut mieux que rien : ouvrez-la avec « [en cours] » dans le titre.
