"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { STATUTS, type Statut } from "@/lib/domaine";
import { useStore } from "@/lib/store";
import { compterParStatut } from "./compteurs";

export function CompteursDemandes() {
  const { demandes } = useStore();
  const compteurs = compterParStatut(demandes);
  return (
    <section aria-label="Demandes par statut" className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {(Object.keys(STATUTS) as Statut[]).map((s) => (
        <Card key={s} className="gap-2 py-4">
          <CardHeader className="px-4">
            <CardDescription>{STATUTS[s]}</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <CardTitle className="text-3xl" data-testid={`compteur-${s}`}>{compteurs[s]}</CardTitle>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
