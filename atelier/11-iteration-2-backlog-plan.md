# Itération 2 · Backlog et plan

**Durée** : 25 minutes (15h00 → 15h25) · **Où** : GitHub puis Claude Code dans le Codespace.

## Partie A · Le backlog (10 min) · au clavier : un membre du groupe

Vos stories deviennent des **issues GitHub** : c'est le contrat entre ceux qui spécifient et l'IA qui réalise.

**Option 1 (recommandée) · depuis Claude Code**, dans le panneau Claude du Codespace :

```
Voici nos user stories : [coller les stories].
Pour chacune, crée une issue GitHub avec la commande gh,
labels "type:story,epic:E[n],groupe:[n]" et le jalon "Sprint 1 · 13/10".
Montre-moi les commandes avant de les exécuter.
```

Relisez les commandes, puis autorisez.

**Option 2 · à la main** : sur GitHub, onglet **Issues** → **New issue** → modèle **User story**.

Puis : choisissez **une** story pour le sprint (la plus simple et la plus visible) et ajoutez-lui le label `pret`.

✅ Les issues apparaissent dans l'onglet Issues ; une story porte le label `pret`.

## Partie B · Le plan (15 min) · au clavier : le référent

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

- [ ] Les issues existent, une story est `pret`
- [ ] Le plan couvre chaque critère d'acceptation par un test
- [ ] Le plan est commité sur une branche `feat/...`

**Bloqués à 15h25 ?** Utilisez le plan de `docs/kits/<votre epic>/kit.md` (section 4).
