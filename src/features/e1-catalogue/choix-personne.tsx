"use client";

// Liste déroulante de personnes, avec un champ de recherche qui la filtre (E1-4, E1-5).
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { filtrerPersonnes, type Personne } from "./annuaire";
import { MessageErreur } from "./message-erreur";

type Props = {
  id: string;
  libelle: React.ReactNode;
  libelleRecherche: React.ReactNode;
  personnes: Personne[];
  valeur: string;
  onChange: (id: string) => void;
  erreur?: string;
  /** Affiche le service à côté du nom. */
  avecService?: boolean;
  /** Première option de la liste. */
  invite?: string;
};

export function ChoixPersonne({ id, libelle, libelleRecherche, personnes, valeur, onChange, erreur, avecService, invite = "Choisir une personne" }: Props) {
  const [recherche, setRecherche] = React.useState("");
  const proposees = filtrerPersonnes(personnes, recherche);

  function rechercher(texte: string) {
    setRecherche(texte);
    // La personne choisie ne doit pas rester sélectionnée si elle ne correspond plus à la recherche.
    if (valeur && !filtrerPersonnes(personnes, texte).some((p) => p.id === valeur)) onChange("");
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={`recherche-${id}`}>{libelleRecherche}</Label>
        <Input
          id={`recherche-${id}`}
          type="search"
          placeholder="Premières lettres du nom"
          value={recherche}
          onChange={(e) => rechercher(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={id}>{libelle}</Label>
        <NativeSelect
          id={id}
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!erreur}
          aria-describedby={`erreur-${id}`}
        >
          <option value="">{proposees.length ? invite : "Aucune personne trouvée"}</option>
          {proposees.map((p) => (
            <option key={p.id} value={p.id}>{avecService ? `${p.nom} (${p.service})` : p.nom}</option>
          ))}
        </NativeSelect>
        <MessageErreur id={`erreur-${id}`} message={erreur} />
      </div>
    </>
  );
}
