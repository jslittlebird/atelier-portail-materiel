// Règles métier de l'epic E1 (catalogue et demande). Fonctions pures, testées dans regles.test.ts.
import type { Article } from "@/lib/domaine";

/** Un article sans stock reste consultable mais est signalé « Indisponible ». */
export function estIndisponible(article: Article): boolean {
  return article.stock === 0;
}

export function libelleDelai(article: Article): string {
  return `${article.delaiJours} jour${article.delaiJours > 1 ? "s" : ""}`;
}

/** Valeur du filtre qui affiche tout le catalogue. */
export const TOUTES_CATEGORIES = "toutes";

/** Catégories du catalogue, sans doublon, dans l'ordre d'apparition. */
export function categories(articles: Article[]): string[] {
  return [...new Set(articles.map((a) => a.categorie))];
}

export function filtrerParCategorie(articles: Article[], categorie: string): Article[] {
  return categorie === TOUTES_CATEGORIES ? articles : articles.filter((a) => a.categorie === categorie);
}
