---
name: rediger-user-story
description: Transforme un besoin exprimé en langage courant en user story GitHub prête à développer, avec des critères d'acceptation testables. À utiliser pour alimenter le backlog.
---

À partir du besoin décrit par l'utilisateur :

1. Identifie l'epic concerné (E1, E2 ou E3, voir `CLAUDE.md`) et le rôle (demandeur, manager, gestionnaire de stock).
2. Si le besoin est flou, pose au maximum 3 questions avant d'écrire.
3. Rédige la story : « En tant que …, je veux …, afin de … ».
4. Écris 3 à 5 critères d'acceptation au format « Étant donné … Quand … Alors … », chacun vérifiable par un test.
5. Ajoute une section « Hors périmètre » pour ce qui ne sera pas fait.
6. Estime la taille : S (moins d'une heure), M (une demi-journée), L (plus : à découper).
7. Propose la commande pour créer l'issue, sans l'exécuter avant validation :
   `gh issue create --title "<titre>" --body-file <fichier> --label "type:story,epic:E<n>,groupe:<n>"`
