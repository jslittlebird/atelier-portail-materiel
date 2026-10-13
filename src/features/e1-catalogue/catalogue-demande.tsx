"use client";

// Écran de l'epic E1 : le catalogue, puis la demande de l'article choisi.
import * as React from "react";
import { catalogue, type Article } from "@/lib/domaine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { ListeCatalogue } from "./liste-catalogue";
import { categories, filtrerParCategorie, TOUTES_CATEGORIES } from "./regles";

export function CatalogueDemande() {
  const [choisi, setChoisi] = React.useState<Article | null>(null);
  const [categorie, setCategorie] = React.useState(TOUTES_CATEGORIES);

  return (
    <div className="space-y-6">
      {choisi && (
        <Card aria-label="Demande">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Demander : {choisi.nom}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setChoisi(null)}>Fermer</Button>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">Formulaire de demande à venir (E1-3).</CardContent>
        </Card>
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
      <ListeCatalogue articles={filtrerParCategorie(catalogue, categorie)} onDemander={setChoisi} />
    </div>
  );
}
