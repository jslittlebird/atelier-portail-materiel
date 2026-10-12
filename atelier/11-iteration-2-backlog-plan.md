# Étape 2 · Backlog et plan

**Durée** : 20 minutes (15h10 → 15h30) · **Où** : GitHub puis Claude Code dans le Codespace.

## Partie A · L'issue (8 min) · au clavier : le gardien des critères

Vos stories deviennent des **issues GitHub** : c'est le contrat entre ceux qui spécifient et l'IA qui réalise.

On ne crée qu'**une** issue : celle de la story choisie pour le sprint.

1. Sur GitHub, onglet **Issues** → **New issue** → modèle **User story**.
2. Titre : le titre court de la story. Coller la story et ses critères dans les champs.
3. À droite, **Labels** : `epic:E[n]`, `groupe:[n]` et `pret`. **Milestone** : « Sprint 1 · 13/10 ».
4. **Create**. Notez le numéro de l'issue (#n) : il sert pour la suite.

*Pour aller plus vite une autre fois* : Claude Code peut créer les issues lui-même avec la commande `gh` (il montre la commande et demande l'autorisation avant).

✅ L'issue apparaît dans l'onglet Issues avec le label `pret`.

## Partie B · Le plan (12 min) · au clavier : le référent

1. Dans le panneau Claude, passer en mode **Plan**.
2. Coller :

```
Lis l'issue #[numéro] et CLAUDE.md.
Propose un plan d'implémentation : fichiers créés ou modifiés (uniquement dans notre dossier
src/features/ et notre page), tests prévus pour chaque critère d'acceptation, risques.
Ne modifie rien.
```

3. **Relecture en groupe** (le gardien des critères vérifie) :
    - chaque critère d'acceptation a-t-il un test prévu ?
    - le plan reste-t-il dans notre dossier ?
    - aucune nouvelle dépendance ?
4. Si besoin, faites corriger : `Le critère 2 n'est pas couvert, ajoute un test.`
5. Puis :

```
Le plan est validé. Enregistre-le dans docs/plan/E[n]-[numéro].md,
crée la branche feat/[numéro]-[titre-court] et fais un premier commit.
```

## ✅ Checkpoint 6b · validé par le référent et l'animateur

- [ ] L'issue de la story choisie existe, avec le label `pret`
- [ ] Le plan couvre chaque critère d'acceptation par un test
- [ ] Le plan est commité sur une branche `feat/...`

**Bloqués à 15h30 ?** Utilisez le plan de `docs/kits/<votre epic>/kit.md` (section 4).
