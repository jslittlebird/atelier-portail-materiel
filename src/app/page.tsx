"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { ROLES } from "@/lib/domaine";

export default function Accueil() {
  const { role, reinitialiser } = useStore();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Portail de demandes de matériel IT</h1>
        <p className="text-muted-foreground mt-1">
          Demander un équipement, le faire valider, suivre sa livraison. Vous êtes connecté en tant que{" "}
          <strong>{ROLES[role]}</strong>.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Catalogue</CardTitle>
            <CardDescription>Parcourir le matériel et faire une demande.</CardDescription>
          </CardHeader>
          <CardContent><Button asChild variant="outline"><Link href="/catalogue">Ouvrir</Link></Button></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Validation</CardTitle>
            <CardDescription>Valider ou refuser les demandes, suivre leur statut.</CardDescription>
          </CardHeader>
          <CardContent><Button asChild variant="outline"><Link href="/validation">Ouvrir</Link></Button></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stock</CardTitle>
            <CardDescription>Suivre le stock, préparer et livrer.</CardDescription>
          </CardHeader>
          <CardContent><Button asChild variant="outline"><Link href="/stock">Ouvrir</Link></Button></CardContent>
        </Card>
      </div>
      <Button variant="ghost" size="sm" onClick={reinitialiser}>Réinitialiser les données de démonstration</Button>
    </div>
  );
}
