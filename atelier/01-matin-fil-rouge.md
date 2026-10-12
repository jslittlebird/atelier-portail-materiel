# Fil rouge du matin : de l'intention aux specs

**Durée** : 50 minutes · **Où** : Claude (web ou application) · **Livrable à 12h20** : une note d'intention et des specs v0.

## Ce qu'on fait et pourquoi

On décrit un outil fictif : un **portail de demandes de matériel IT**. Le sujet compte peu : on apprend à **cadrer un projet avec l'IA**. À 14h, toute l'équipe partira de votre travail pour construire le portail.

## Le besoin, tel qu'on vous le donne

> Les demandes de matériel arrivent par mail ou par téléphone. Elles se perdent, personne ne sait où en est sa demande, et le stock est suivi dans un tableur. On veut un portail simple, avec 3 blocs :
> **E1** Catalogue et demande · **E2** Validation et suivi · **E3** Stock et livraison.

## Étape 1 · Créer le Projet (5 min) · au clavier : personne A

1. Dans Claude, menu de gauche : **Projets** → **Créer un projet**.
2. Nom : `Portail matériel IT`.
3. Dans **Instructions du projet**, coller :

```
Tu es un chef de projet DSI expérimenté. Tu m'aides à cadrer un projet interne.
Tu poses des questions avant de rédiger, tu écris en français simple,
tu signales ce qui est flou ou risqué. Les données sont fictives.
```

4. Partager le projet avec les autres membres du groupe (bouton **Partager**).

✅ **Checkpoint** : tout le monde voit le projet.

## Étape 2 · Se faire interviewer (15 min) · au clavier : personne B

Dans une conversation du projet, coller :

```
Voici un besoin : [coller le besoin ci-dessus].
Avant de rédiger quoi que ce soit, pose-moi 5 questions pour bien comprendre
qui utilisera ce portail, ce qui pose problème aujourd'hui et ce qu'on attend.
Une question à la fois.
```

Répondez ensemble, à voix haute, avec votre expérience de la DSI. Vous pouvez inventer ce que vous ne savez pas.

✅ **Checkpoint** : Claude a posé ses 5 questions et vous avez répondu.

## Étape 3 · La note d'intention (10 min) · au clavier : personne C

```
Rédige maintenant une note d'intention d'une page : le problème, ce que l'on veut,
pour qui, comment on saura que c'est réussi, ce qui est hors périmètre.
```

Relisez. Corrigez au moins **une** chose : « Ce n'est pas vrai chez nous parce que… ».

✅ **Checkpoint** : la note tient sur une page et vous êtes d'accord avec elle.

## Étape 4 · Les specs v0 (15 min) · au clavier : personne D

```
À partir de cette note, rédige des spécifications v0 :
1. 3 personas (nom fictif, rôle, besoin, irritant actuel) ;
2. le parcours principal d'une demande, avec ses statuts ;
3. pour chacun des 3 epics (E1, E2, E3) : l'objectif et un indicateur de réussite.
Présente le tout sous forme de tableaux.
```

✅ **Checkpoint** (relu avec l'animateur à 12h20) :
- [ ] les 3 epics sont décrits ;
- [ ] on sait qui utilise chaque partie ;
- [ ] le hors périmètre est écrit.

## Bonus (si le temps le permet)

```
Fais-en 3 slides pour présenter le projet à l'équipe à 14h :
le problème, la solution, les 3 epics.
```

## Si vous êtes bloqués

Appelez l'animateur. Une version de secours existe : personne ne repart sans livrable.
