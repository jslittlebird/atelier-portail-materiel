"use client";

// E1-1 : liste du catalogue (nom, catégorie, stock, délai) avec un bouton « Demander » par article.
import type { Article } from "@/lib/domaine";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { estIndisponible, libelleDelai } from "./regles";

type Props = {
  articles: Article[];
  onDemander: (article: Article) => void;
};

export function ListeCatalogue({ articles, onDemander }: Props) {
  return (
    <Table aria-label="Catalogue">
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Article</TableHead>
          <TableHead scope="col">Catégorie</TableHead>
          <TableHead scope="col">Stock</TableHead>
          <TableHead scope="col">Délai de livraison</TableHead>
          <TableHead scope="col"><span className="sr-only">Action</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-medium">{article.nom}</TableCell>
            <TableCell>{article.categorie}</TableCell>
            <TableCell>
              {estIndisponible(article) ? <Badge variant="destructive">Indisponible</Badge> : article.stock}
            </TableCell>
            <TableCell>{libelleDelai(article)}</TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="outline" aria-label={`Demander ${article.nom}`} onClick={() => onDemander(article)}>
                Demander
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
