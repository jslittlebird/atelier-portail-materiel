"use client";

// Écran de l'epic E1 : le catalogue, puis la demande de l'article choisi.
import * as React from "react";
import { articleParId, catalogue, STATUTS, type Article, type Demande } from "@/lib/domaine";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { AssistantOnboarding } from "./assistant-onboarding";
import { FormulaireDemande } from "./formulaire-demande";
import { ListeCatalogue } from "./liste-catalogue";
import { categories, filtrerParCategorie, TOUTES_CATEGORIES } from "./regles";

function Confirmation({ demande }: { demande: Demande }) {
  return (
    <Alert>
      <AlertTitle>Demande {demande.id} soumise</AlertTitle>
      <AlertDescription>
        <p>{articleParId(demande.articleId)?.nom} × {demande.quantite} · statut « {STATUTS[demande.statut]} »</p>
        <p>Émetteur : {demande.demandeur} ({demande.service})</p>
        {demande.nouvelArrivant && <p>Pour : {demande.nouvelArrivant.prenom} {demande.nouvelArrivant.nom}</p>}
      </AlertDescription>
    </Alert>
  );
}

export function CatalogueDemande() {
  const [choisi, setChoisi] = React.useState<Article | null>(null);
  const [creee, setCreee] = React.useState<Demande | null>(null);
  const [categorie, setCategorie] = React.useState(TOUTES_CATEGORIES);
  const [assistantOuvert, setAssistantOuvert] = React.useState(false);

  function choisir(article: Article) {
    setCreee(null);
    setChoisi(article);
  }

  if (assistantOuvert) return <AssistantOnboarding onFermer={() => setAssistantOuvert(false)} />;

  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          setCreee(null);
          setAssistantOuvert(true);
        }}
      >
        Préparer l&apos;arrivée d&apos;un nouvel arrivant
      </Button>
      {creee && <Confirmation demande={creee} />}
      {choisi && (
        <FormulaireDemande
          key={choisi.id}
          article={choisi}
          onFermer={() => setChoisi(null)}
          onCreee={(demande) => {
            setCreee(demande);
            setChoisi(null);
          }}
        />
      )}
      <div className="max-w-xs space-y-2">
        <Label htmlFor="filtre-categorie">Catégorie</Label>
        <NativeSelect id="filtre-categorie" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          <option value={TOUTES_CATEGORIES}>Toutes les catégories</option>
          {categories(catalogue).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </NativeSelect>
      </div>
      <ListeCatalogue articles={filtrerParCategorie(catalogue, categorie)} onDemander={choisir} />
    </div>
  );
}
