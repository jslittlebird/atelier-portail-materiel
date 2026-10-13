// Modèle métier partagé par les 3 epics. Toute modification passe par une revue de JS.
import catalogueInitial from "@/data/catalogue.json";
import demandesInitiales from "@/data/demandes.json";

export type Role = "demandeur" | "manager" | "gestionnaire";

export const ROLES: Record<Role, string> = {
  demandeur: "Demandeur",
  manager: "Manager",
  gestionnaire: "Gestionnaire de stock",
};

export type Article = {
  id: string;
  nom: string;
  categorie: string;
  stock: number;
  seuilAlerte: number;
  delaiJours: number;
};

export type Statut = "soumise" | "validee" | "refusee" | "en_preparation" | "livree";

export const STATUTS: Record<Statut, string> = {
  soumise: "Soumise",
  validee: "Validée",
  refusee: "Refusée",
  en_preparation: "En préparation",
  livree: "Livrée",
};

/** Dossier d'arrivée d'un nouvel arrivant (E1-5, E1-6) : une demande par matériel, toutes liées au même dossier. */
export type Onboarding = {
  dossierId: string;
  /** Date d'arrivée, AAAA-MM-JJ. */
  dateArrivee: string;
  /** Applications à ouvrir, avec le nom de la personne dont les droits servent de modèle. */
  applications: { application: string; profilReference: string }[];
  repertoires: string[];
};

export type Demande = {
  id: string;
  demandeur: string;
  service: string;
  articleId: string;
  quantite: number;
  motif: string;
  statut: Statut;
  creeLe: string;
  commentaire?: string;
  /** Personne pour qui le matériel est demandé (demande d'onboarding, E1-4). Optionnel. */
  nouvelArrivant?: { prenom: string; nom: string };
  /** Dossier d'arrivée auquel la demande appartient (E1-6). Optionnel. */
  onboarding?: Onboarding;
};

export const catalogue: Article[] = catalogueInitial;
export const demandesDeDepart: Demande[] = demandesInitiales as Demande[];

/** Transitions autorisées entre statuts (le cycle de vie d'une demande). */
export const TRANSITIONS: Record<Statut, Statut[]> = {
  soumise: ["validee", "refusee"],
  validee: ["en_preparation"],
  refusee: [],
  en_preparation: ["livree"],
  livree: [],
};

export function peutPasserA(actuel: Statut, cible: Statut): boolean {
  return TRANSITIONS[actuel].includes(cible);
}

export function changerStatut(demande: Demande, cible: Statut, commentaire?: string): Demande {
  if (!peutPasserA(demande.statut, cible)) {
    throw new Error(`Transition impossible : ${STATUTS[demande.statut]} vers ${STATUTS[cible]}`);
  }
  return { ...demande, statut: cible, ...(commentaire ? { commentaire } : {}) };
}

export function prochainId(demandes: Demande[]): string {
  const max = demandes.reduce((m, d) => Math.max(m, Number(d.id.replace("D-", "")) || 0), 0);
  return `D-${String(max + 1).padStart(3, "0")}`;
}

export function articleParId(id: string): Article | undefined {
  return catalogue.find((a) => a.id === id);
}

export function enAlerte(article: Article): boolean {
  return article.stock <= article.seuilAlerte;
}
