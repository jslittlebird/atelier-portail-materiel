# Fil rouge du matin : poser l'intention du projet

**Durée** : 50 minutes (11h30 → 12h20) · **Où** : Claude (web ou application), dans un Projet partagé · **Livrable à 12h20** : une note d'intention et des specs v0.

## Ce qu'on fait et pourquoi

On cadre un outil fictif : un **portail de demandes de matériel IT**. Le sujet compte peu : on apprend à **cadrer un projet avec l'IA**. À 14h, toute l'équipe partira de votre travail pour construire le portail.

## Les mots du projet

| Mot | Ce que c'est |
| --- | --- |
| Note d'intention | Une page : pourquoi on fait ce projet, pour qui, comment on saura que c'est réussi |
| Persona | Un utilisateur type, fictif mais réaliste (ex. « Nadia, manager logistique ») |
| Parcours | Les étapes vécues par l'utilisateur ; ici, les statuts d'une demande |
| Epic | Un grand bloc du produit (ex. « Catalogue et demande ») |
| User story | Un besoin en une phrase : « En tant que…, je veux…, afin de… » (cet après-midi) |
| Markdown | Du texte simple : `#` pour un titre, `-` pour une liste. Claude écrit en Markdown |
| Mermaid | Un schéma décrit en texte, que Claude dessine |

## Le besoin, tel qu'on vous le donne

> Les demandes de matériel arrivent par mail ou par téléphone. Elles se perdent, personne ne sait où en est sa demande, et le stock est suivi dans un tableur. On veut un portail simple, avec 3 blocs (les 3 epics) :
> **E1** Catalogue et demande · **E2** Validation et suivi · **E3** Stock et livraison.

## Qui tient le clavier

Le clavier change à chaque étape (prénoms au tableau). Les autres conseillent **sans toucher la souris**. S'il y a des participants en plus, ils sont **relecteurs** : ils lisent à voix haute ce que Claude produit et demandent « est-ce vrai chez nous ? ».

## Étape 1 · Créer le Projet (5 min) · clavier n°1

1. Dans Claude, menu de gauche : **Projets** → **Créer un projet**.
2. Nom : `Portail matériel IT`.
3. Dans **Instructions du projet**, coller :

```
Tu es un chef de projet DSI expérimenté. Tu m'aides à cadrer un projet interne.
Tu poses des questions avant de rédiger, tu écris en français simple, en Markdown,
et tu signales ce qui est flou ou risqué. Les données sont fictives.
```

4. Bouton **Partager** : ajouter les autres membres du groupe.

✅ Tout le monde voit le projet.

## Étape 2 · L'interview (15 min) · clavier n°2

C'est Claude qui pose les questions ; le groupe joue le rôle du client. Dans une conversation du projet, coller :

```
Voici un besoin : [coller le besoin ci-dessus].
Avant de rédiger quoi que ce soit, pose-moi 5 questions pour bien comprendre
qui utilisera ce portail, ce qui pose problème aujourd'hui et ce qu'on attend.
Une question à la fois.
```

Pour chaque question : **le groupe en discute une minute**, puis la personne au clavier **tape la réponse commune**. On peut inventer ce qu'on ne sait pas.

✅ Claude a posé ses 5 questions et vous avez répondu.

## Étape 3 · La note d'intention (10 min) · clavier n°3

```
Rédige maintenant une note d'intention d'une page, en Markdown, avec 5 rubriques :
## Le problème
## Ce qu'on veut
## Pour qui
## Réussi si
## Hors périmètre
```

Relisez à voix haute. Corrigez au moins **une** chose : « Ce n'est pas vrai chez nous parce que… ».

Exemple de forme (sur un autre sujet) :

```markdown
# Réservation des salles
## Le problème
Réservations par mail, doublons chaque semaine.
## Ce qu'on veut
Voir les salles libres et réserver en deux clics.
## Pour qui
Tous les salariés ; l'accueil gère les exceptions.
## Réussi si
Zéro doublon au bout d'un mois.
## Hors périmètre
Le matériel des salles.
```

✅ La note tient sur une page et vous êtes d'accord avec elle.

## Étape 4 · Les specs v0 (20 min) · clavier n°4

```
À partir de cette note, rédige des spécifications v0 en Markdown :
1. 3 personas (nom fictif, rôle, besoin, ce qui l'agace aujourd'hui), en tableau ;
2. le parcours d'une demande, de sa création à sa livraison, en diagramme Mermaid ;
3. les 3 epics (E1, E2, E3) : une phrase d'objectif chacun et qui l'utilise.
```

Si le diagramme ne s'affiche pas : `Affiche le diagramme Mermaid dans un artefact.`

✅ **Point de contrôle** (relu avec l'animateur à 12h20) :
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
