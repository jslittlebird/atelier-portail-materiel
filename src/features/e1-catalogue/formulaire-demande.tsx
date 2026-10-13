"use client";

// E1-3 : formulaire de demande d'un article (quantité et motif). Réservé au rôle Manager.
import * as React from "react";
import type { Article, Demande } from "@/lib/domaine";
import { useStore } from "@/lib/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  creerDemande,
  estValide,
  QUANTITE_MAX,
  QUANTITE_MIN,
  validerDemande,
  type Emetteur,
  type ErreursDemande,
  type SaisieDemande,
} from "./regles";

// Émetteur fictif utilisé tant que le choix de l'émetteur n'existe pas (E1-4).
const EMETTEUR_DEMO: Emetteur = { nom: "Karim Lefèvre", service: "Centre VHU de Lyon" };

type Props = {
  article: Article;
  onFermer: () => void;
  onCreee: (demande: Demande) => void;
};

function MessageErreur({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="text-destructive text-sm">{message}</p>;
}

export function FormulaireDemande({ article, onFermer, onCreee }: Props) {
  const { role, demandes, setDemandes } = useStore();
  const [saisie, setSaisie] = React.useState<SaisieDemande>({ quantite: "1", motif: "" });
  const [erreurs, setErreurs] = React.useState<ErreursDemande>({});

  function soumettre(e: React.FormEvent) {
    e.preventDefault();
    const trouvees = validerDemande(saisie);
    setErreurs(trouvees);
    if (!estValide(trouvees)) return;
    const nouvelle = creerDemande(demandes, article, saisie, EMETTEUR_DEMO);
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
