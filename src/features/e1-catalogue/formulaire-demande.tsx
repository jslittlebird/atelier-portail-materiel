"use client";

// E1-3 et E1-4 : formulaire de demande d'un article pour un nouvel arrivant. Réservé au rôle Manager.
import * as React from "react";
import type { Article, Demande } from "@/lib/domaine";
import { useStore } from "@/lib/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMETTEURS } from "./annuaire";
import { ChoixPersonne } from "./choix-personne";
import { MessageErreur } from "./message-erreur";
import {
  creerDemande,
  estValide,
  QUANTITE_MAX,
  QUANTITE_MIN,
  validerDemande,
  type ErreursDemande,
  type SaisieDemande,
} from "./regles";

type Props = {
  article: Article;
  onFermer: () => void;
  onCreee: (demande: Demande) => void;
};

export function FormulaireDemande({ article, onFermer, onCreee }: Props) {
  const { role, demandes, setDemandes } = useStore();
  const [saisie, setSaisie] = React.useState<SaisieDemande>({ emetteurId: "", prenom: "", nom: "", quantite: "1", motif: "" });
  const [erreurs, setErreurs] = React.useState<ErreursDemande>({});

  function soumettre(e: React.FormEvent) {
    e.preventDefault();
    const trouvees = validerDemande(saisie);
    setErreurs(trouvees);
    if (!estValide(trouvees)) return;
    const emetteur = EMETTEURS.find((em) => em.id === saisie.emetteurId)!;
    const nouvelle = creerDemande(demandes, article, saisie, emetteur);
    setDemandes((d) => [...d, nouvelle]);
    onCreee(nouvelle);
  }

  return (
    <Card aria-label="Demande">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Demander : {article.nom}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onFermer}>Fermer</Button>
      </CardHeader>
      <CardContent>
        {role !== "manager" ? (
          <Alert>
            <AlertTitle>Demande réservée aux managers</AlertTitle>
            <AlertDescription>Choisissez « Manager » dans le menu « Je suis » pour faire une demande.</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={soumettre} noValidate className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <ChoixPersonne
                id="emetteur"
                libelle="Émetteur"
                libelleRecherche="Rechercher un émetteur"
                invite="Choisir un émetteur"
                personnes={EMETTEURS}
                valeur={saisie.emetteurId}
                onChange={(emetteurId) => setSaisie((s) => ({ ...s, emetteurId }))}
                erreur={erreurs.emetteurId}
              />
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom du nouvel arrivant</Label>
                <Input
                  id="prenom"
                  value={saisie.prenom}
                  onChange={(e) => setSaisie({ ...saisie, prenom: e.target.value })}
                  aria-invalid={!!erreurs.prenom}
                  aria-describedby="erreur-prenom"
                />
                <MessageErreur id="erreur-prenom" message={erreurs.prenom} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom du nouvel arrivant</Label>
                <Input
                  id="nom"
                  value={saisie.nom}
                  onChange={(e) => setSaisie({ ...saisie, nom: e.target.value })}
                  aria-invalid={!!erreurs.nom}
                  aria-describedby="erreur-nom"
                />
                <MessageErreur id="erreur-nom" message={erreurs.nom} />
              </div>
            </div>
            <div className="max-w-32 space-y-2">
              <Label htmlFor="quantite">Quantité</Label>
              <Input
                id="quantite"
                type="number"
                min={QUANTITE_MIN}
                max={QUANTITE_MAX}
                value={saisie.quantite}
                onChange={(e) => setSaisie({ ...saisie, quantite: e.target.value })}
                aria-invalid={!!erreurs.quantite}
                aria-describedby="erreur-quantite"
              />
              <MessageErreur id="erreur-quantite" message={erreurs.quantite} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motif">Motif</Label>
              <Textarea
                id="motif"
                value={saisie.motif}
                onChange={(e) => setSaisie({ ...saisie, motif: e.target.value })}
                aria-invalid={!!erreurs.motif}
                aria-describedby="erreur-motif"
              />
              <MessageErreur id="erreur-motif" message={erreurs.motif} />
            </div>
            <Button type="submit">Soumettre la demande</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
