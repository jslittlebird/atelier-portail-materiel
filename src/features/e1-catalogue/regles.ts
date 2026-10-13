// Règles métier de l'epic E1 (catalogue et demande). Fonctions pures, testées dans regles.test.ts.
import { prochainId, type Article, type Demande } from "@/lib/domaine";

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

export const QUANTITE_MIN = 1;
export const QUANTITE_MAX = 5;
export const MOTIF_MIN = 10;

/** Saisie du formulaire de demande, telle que tapée par l'utilisateur. */
export type SaisieDemande = { quantite: string; motif: string };
export type ErreursDemande = Partial<Record<keyof SaisieDemande, string>>;

/** Personne qui émet la demande (son nom et son service sont enregistrés dans la demande). */
export type Emetteur = { nom: string; service: string };

export function validerDemande(saisie: SaisieDemande): ErreursDemande {
  const erreurs: ErreursDemande = {};
  const quantite = Number(saisie.quantite);
  if (saisie.quantite.trim() === "" || !Number.isInteger(quantite) || quantite < QUANTITE_MIN || quantite > QUANTITE_MAX) {
    erreurs.quantite = `La quantité doit être un nombre entier entre ${QUANTITE_MIN} et ${QUANTITE_MAX}.`;
  }
  if (saisie.motif.trim().length < MOTIF_MIN) {
    erreurs.motif = `Le motif doit contenir au moins ${MOTIF_MIN} caractères.`;
  }
  return erreurs;
}

export function estValide(erreurs: object): boolean {
  return Object.keys(erreurs).length === 0;
}

/** Construit la nouvelle demande au statut « Soumise ». La saisie doit avoir été validée. */
export function creerDemande(
  demandes: Demande[],
  article: Article,
  saisie: SaisieDemande,
  emetteur: Emetteur,
  aujourdhui: Date = new Date()
): Demande {
  return {
    id: prochainId(demandes),
    demandeur: emetteur.nom,
    service: emetteur.service,
    articleId: article.id,
    quantite: Number(saisie.quantite),
    motif: saisie.motif.trim(),
    statut: "soumise",
    creeLe: aujourdhui.toISOString().slice(0, 10),
  };
}
