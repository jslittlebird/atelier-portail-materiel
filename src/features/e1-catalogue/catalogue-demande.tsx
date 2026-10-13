"use client";

// Écran de l'epic E1 : le catalogue, puis la demande de l'article choisi.
import * as React from "react";
import { catalogue, type Article } from "@/lib/domaine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListeCatalogue } from "./liste-catalogue";

export function CatalogueDemande() {
  const [choisi, setChoisi] = React.useState<Article | null>(null);

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
      <ListeCatalogue articles={catalogue} onDemander={setChoisi} />
    </div>
  );
}
