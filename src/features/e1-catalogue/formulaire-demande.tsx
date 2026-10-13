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
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import emetteursFictifs from "./emetteurs.json";
import {
  creerDemande,
  estValide,
  filtrerEmetteurs,
  QUANTITE_MAX,
  QUANTITE_MIN,
  validerDemande,
  type Emetteur,
  type ErreursDemande,
  type SaisieDemande,
} from "./regles";

// Prototype : liste fictive à la place de l'annuaire de l'entreprise.
const EMETTEURS: Emetteur[] = emetteursFictifs;

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
  const [saisie, setSaisie] = React.useState<SaisieDemande>({ emetteurId: "", prenom: "", nom: "", quantite: "1", motif: "" });
  const [recherche, setRecherche] = React.useState("");
  const [erreurs, setErreurs] = React.useState<ErreursDemande>({});
  const proposes = filtrerEmetteurs(EMETTEURS, recherche);

  function rechercher(texte: string) {
    setRecherche(texte);
    // L'émetteur choisi ne doit pas rester sélectionné s'il ne correspond plus à la recherche.
    if (!filtrerEmetteurs(EMETTEURS, texte).some((e) => e.id === saisie.emetteurId)) {
      setSaisie({ ...saisie, emetteurId: "" });
    }
  }

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
              <div className="space-y-2">
                <Label htmlFor="recherche-emetteur">Rechercher un émetteur</Label>
                <Input
                  id="recherche-emetteur"
                  type="search"
                  placeholder="Premières lettres du nom"
                  value={recherche}
                  onChange={(e) => rechercher(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emetteur">Émetteur</Label>
                <NativeSelect
                  id="emetteur"
                  value={saisie.emetteurId}
                  onChange={(e) => setSaisie({ ...saisie, emetteurId: e.target.value })}
                  aria-invalid={!!erreurs.emetteurId}
                  aria-describedby="erreur-emetteur"
                >
                  <option value="">{proposes.length ? "Choisir un émetteur" : "Aucun émetteur trouvé"}</option>
                  {proposes.map((em) => (
                    <option key={em.id} value={em.id}>{em.nom}</option>
                  ))}
                </NativeSelect>
                <MessageErreur id="erreur-emetteur" message={erreurs.emetteurId} />
              </div>
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
