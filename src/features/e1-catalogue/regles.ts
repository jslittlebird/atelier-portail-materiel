// Règles métier de l'epic E1 (catalogue et demande). Fonctions pures, testées dans regles.test.ts.
import type { Article } from "@/lib/domaine";

/** Un article sans stock reste consultable mais est signalé « Indisponible ». */
export function estIndisponible(article: Article): boolean {
  return article.stock === 0;
}

export function libelleDelai(article: Article): string {
  return `${article.delaiJours} jour${article.delaiJours > 1 ? "s" : ""}`;
}
