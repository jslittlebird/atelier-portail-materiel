# Étape 1 · Les specs de votre epic

**Durée** : 20 minutes (14h50 → 15h10) · **Où** : Claude › Projets › un Projet « Portail · E1 » (ou E2, E3) · **Au clavier** : la personne venue le matin, qui a importé le skill à l'étape 0. Le **gardien des critères** note les décisions.

## Objectif

Transformer votre epic en **3 à 5 user stories** avec des **critères d'acceptation testables**.

## Pas à pas

**1. Donner le contexte (2 min)** · créer le Projet, puis y déposer `docs/00-intention.md` et `docs/01-specs-v0.md` (sur GitHub, ouvrir chaque fichier → bouton **Download raw file**, puis glisser dans le Projet). Coller :

```
Nous sommes le groupe de l'epic [E1 Catalogue et demande / E2 Validation et suivi / E3 Stock et livraison].
Lis la note d'intention et les specs v0. Résume en 5 lignes ce que doit faire notre epic.
```

**2. Les règles de gestion (5 min)**

```
Liste les règles de gestion de notre epic et les cas limites
(ce qui peut mal se passer). Pose-nous les questions sur ce qui n'est pas clair.
```

Répondez. Le **gardien des critères** note les décisions.

**3. Les user stories (8 min)** · le skill `rediger-user-story` s'active tout seul

```
Rédige 3 à 5 user stories pour notre epic.
```

Si le skill ne s'active pas : `Utilise le skill rediger-user-story.`

**4. Challenger (5 min)** · lisez à voix haute et demandez :

```
Relis ces stories comme un développeur prestataire qui va les réaliser :
qu'est-ce qui est ambigu, manquant ou impossible à tester ?
```

Corrigez.

## ✅ Checkpoint 6a · validé par le product owner

- [ ] 3 à 5 stories, chacune avec des critères **testables**
- [ ] Le hors périmètre est écrit
- [ ] Le groupe sait laquelle il veut faire en premier

**Bloqués à 15h10 ?** Ouvrez `docs/kits/<votre epic>/kit.md`, sections 1 et 2, et passez à l'itération 2.
