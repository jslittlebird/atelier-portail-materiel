// Données fictives de l'epic E1 : annuaire (à la place de l'AD / Entra ID) et applications.
import annuaireFictif from "./annuaire.json";
import applicationsFictives from "./applications.json";

/** Personne de l'annuaire. Les managers peuvent émettre une demande. */
export type Personne = { id: string; nom: string; service: string; manager: boolean };

export const ANNUAIRE: Personne[] = annuaireFictif;
export const EMETTEURS: Personne[] = ANNUAIRE.filter((p) => p.manager);
export const APPLICATIONS: string[] = applicationsFictives;

/** Services de l'annuaire, sans doublon, par ordre alphabétique. */
export const SERVICES: string[] = [...new Set(ANNUAIRE.map((p) => p.service))].sort((a, b) => a.localeCompare(b, "fr"));

export function personneParId(id: string): Personne | undefined {
  return ANNUAIRE.find((p) => p.id === id);
}

/** Minuscules et sans accents, pour une recherche tolérante (« emilie » trouve « Émilie »). */
function normaliser(texte: string): string {
  return texte.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

/** Personnes dont le nom contient le texte recherché. */
export function filtrerPersonnes<T extends { nom: string }>(personnes: T[], recherche: string): T[] {
  const cle = normaliser(recherche);
  return personnes.filter((p) => normaliser(p.nom).includes(cle));
}
