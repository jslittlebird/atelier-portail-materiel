#!/usr/bin/env bash
# Initialise le dépôt GitHub pour l'atelier : labels, jalon, issues de départ.
# Usage : ./scripts/initialiser-github.sh   (depuis la racine du dépôt, avec gh connecté)
set -euo pipefail

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "Dépôt : $REPO"

label() { gh label create "$1" --color "$2" --description "$3" --force >/dev/null; echo "  label $1"; }
echo "Labels…"
label "type:epic"     "5319e7" "Epic"
label "type:story"    "1d76db" "User story"
label "type:bug"      "d73a4a" "Bug"
label "type:support"  "fbca04" "Ticket support"
label "epic:E0"       "c5def5" "Socle"
label "epic:E1"       "bfd4f2" "Catalogue et demande"
label "epic:E2"       "d4c5f9" "Validation et suivi"
label "epic:E3"       "c2e0c6" "Stock et livraison"
label "groupe:1"      "0e8a16" "Groupe 1"
label "groupe:2"      "006b75" "Groupe 2"
label "groupe:3"      "b60205" "Groupe 3"
label "animateur"     "000000" "Démo de l'animateur"
label "priorite:haute" "e99695" "Priorité haute"
label "pret"          "0e8a16" "Prêt à développer"

echo "Jalon…"
gh api "repos/$REPO/milestones" -f title="Sprint 1 · 13/10" -f description="Atelier IA DSI Indra" >/dev/null 2>&1 || true

issue() { gh issue create --title "$1" --label "$2" --milestone "Sprint 1 · 13/10" --body "$3" >/dev/null; echo "  issue $1"; }
echo "Epics…"
issue "E1 · Catalogue et demande" "type:epic,epic:E1,groupe:1" "Le demandeur parcourt le catalogue et crée une demande de matériel. Specs : \`docs/01-specs-v0.md\`. Kit de rattrapage : \`docs/kits/e1/kit.md\`."
issue "E2 · Validation et suivi" "type:epic,epic:E2,groupe:2" "Le manager valide ou refuse ; le demandeur suit ses demandes. Specs : \`docs/01-specs-v0.md\`. Kit de rattrapage : \`docs/kits/e2/kit.md\`."
issue "E3 · Stock et livraison" "type:epic,epic:E3,groupe:3" "Le gestionnaire suit le stock, prépare et livre. Specs : \`docs/01-specs-v0.md\`. Kit de rattrapage : \`docs/kits/e3/kit.md\`."

echo "Story de démonstration (animateur)…"
issue "Afficher des compteurs de demandes sur la page d'accueil" "type:story,epic:E0,animateur,pret" "En tant que collaborateur, je veux voir sur la page d'accueil le nombre de demandes par statut, afin d'avoir une vue d'ensemble.

**Critères d'acceptation**
- Étant donné les demandes existantes, Quand j'ouvre l'accueil, Alors je vois un compteur par statut (Soumise, Validée, Refusée, En préparation, Livrée).
- Quand une demande change de statut, Alors les compteurs se mettent à jour.
- Un statut sans demande affiche 0."

echo "Bugs et tickets support (pour le tableau de bord)…"
issue "Le menu « Je suis » revient à Demandeur après rechargement" "type:bug,epic:E0" "Constat signalé en recette : à vérifier. Attendu : le rôle choisi est conservé."
issue "Le pied de page chevauche le contenu sur petit écran" "type:bug,epic:E0" "Constat sur un écran 13 pouces à 125 %."
issue "Je ne trouve pas où suivre ma demande d'écran" "type:support" "Ticket utilisateur (service Comptabilité). Réponse attendue : lien vers le suivi des demandes (E2)."
issue "Mon manager est absent, qui peut valider ?" "type:support" "Ticket utilisateur (centre VHU). Question de règle de gestion : délégation de validation ?"
issue "Peut-on demander du matériel pour un nouvel arrivant ?" "type:support" "Ticket utilisateur (Achats). Hors périmètre actuel : à transformer en besoin ?"
issue "Délai affiché pour le terminal durci incohérent" "type:support" "Ticket utilisateur (centre VHU de Lyon). Le délai de 21 jours paraît long : à vérifier avec le fournisseur."

echo "Terminé. Pensez à créer le tableau GitHub Projects (voir atelier/00-preparation-animateur.md)."
