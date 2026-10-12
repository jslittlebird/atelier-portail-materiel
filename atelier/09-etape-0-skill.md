# Étape 0 · Créer son skill « user story »

**Durée** : 10 minutes (14h40 → 14h50) · **Où** : Claude, **nouvelle conversation hors Projet** · **Au clavier** : la personne du groupe venue le matin. Elle garde le clavier à l'étape 1, car le skill sera dans **son** compte.

## Pourquoi

Une user story se rédige toujours de la même façon. Plutôt que de recoller la consigne à chaque fois, on l'écrit **une fois** dans un *skill* : Claude l'applique ensuite tout seul, dans n'importe quelle conversation.

> **Projet** = de quoi on parle (documents, consignes d'un sujet). **Skill** = comment on fait (un savoir-faire réutilisable partout).

## Pas à pas

**1. Faire écrire le skill (3 min)** · coller :

```
Crée un skill nommé rediger-user-story.
Il rédige des user stories en français :
- la phrase « En tant que…, je veux…, afin de… » ;
- 2 à 4 critères d'acceptation vérifiables, au format « Étant donné… Quand… Alors… » ;
- une ligne « Hors périmètre ».
S'il manque une information, il pose une question avant d'écrire.
Livre-le en fichier .zip prêt à importer dans Claude.
```

**2. Lire ensemble (2 min)** · ouvrez le fichier `SKILL.md` montré par Claude. La ligne `description` dit à Claude **quand** utiliser le skill ; le reste dit **comment**. Corrigez si besoin : `Ajoute que les critères doivent pouvoir se vérifier en regardant l'écran.`

**3. Télécharger le .zip (1 min)**

**4. Importer (3 min)** · **Paramètres** → **Capacités** → section **Skills** → **Importer un skill** → choisir le .zip → vérifier qu'il est **activé**.

## ✅ Contrôle

Dans une nouvelle conversation :

```
Rédige une user story : un demandeur veut pouvoir annuler sa demande.
```

Le format du skill est respecté (story, critères, hors périmètre) ? C'est bon.

## En cas de problème

| Symptôme | Que faire |
| --- | --- |
| Pas de section Skills dans Paramètres › Capacités | Activer **Exécution de code et création de fichiers** juste au-dessus, ou prévenir l'animateur |
| L'import est refusé | Demander à Claude : `L'import échoue : vérifie que le dossier porte le même nom que le skill et refais le .zip.` |
| Toujours bloqué | Plan B : l'animateur fournit le .zip tout prêt (`atelier/plan-b/rediger-user-story.zip`) |
