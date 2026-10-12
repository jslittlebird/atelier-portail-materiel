---
name: ticket-vers-story
description: Transforme un ticket support récurrent en user story pour le backlog, quand un même problème revient chez plusieurs utilisateurs.
---

À partir d'un ou plusieurs tickets support (issues avec le label `type:support`) :

1. Résume le problème commun en une phrase.
2. Distingue ce qui relève de la formation, de la documentation ou d'une évolution du produit.
3. S'il s'agit d'une évolution, rédige une user story avec ses critères d'acceptation (voir le skill `rediger-user-story` du projet).
4. Propose la commande `gh issue create` et les liens vers les tickets d'origine, sans l'exécuter avant validation.
