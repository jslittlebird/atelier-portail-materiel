// Règles de l'assistant « Nouvel arrivant » (E1-5 et E1-6). Fonctions pures, testées dans onboarding.test.ts.
import { prochainId, type Demande } from "@/lib/domaine";
import { personneParId } from "./annuaire";
import { dateISO } from "./regles";

/** Une application demandée, avec la personne dont les droits servent de modèle. */
export type ApplicationDemandee = { application: string; profilId: string };

/** Saisie de l'assistant, conservée d'une étape à l'autre. */
export type SaisieOnboarding = {
  emetteurId: string;
  prenom: string;
  nom: string;
  dateArrivee: string;
  service: string;
  applications: ApplicationDemandee[];
  repertoires: string[];
  /** Identifiants des articles du catalogue choisis à l'étape 2 (un exemplaire de chacun). */
  materiels: string[];
};

export const SAISIE_VIDE: SaisieOnboarding = {
  emetteurId: "",
  prenom: "",
  nom: "",
  dateArrivee: "",
  service: "",
  applications: [],
  repertoires: [],
  materiels: [],
};

type ChampAcces = "emetteurId" | "prenom" | "nom" | "dateArrivee" | "service";
/** Erreurs de l'étape 1. `applications` donne l'erreur de chaque application, par son nom. */
export type ErreursAcces = Partial<Record<ChampAcces, string>> & { applications?: Record<string, string> };

/** Contrôle l'étape 1. `aujourdhui` est au format AAAA-MM-JJ. */
export function validerAcces(saisie: SaisieOnboarding, aujourdhui: string): ErreursAcces {
  const erreurs: ErreursAcces = {};
  if (!saisie.emetteurId) erreurs.emetteurId = "Choisissez l'émetteur de la demande.";
  if (!saisie.prenom.trim()) erreurs.prenom = "Saisissez le prénom du nouvel arrivant.";
  if (!saisie.nom.trim()) erreurs.nom = "Saisissez le nom du nouvel arrivant.";
  if (!saisie.dateArrivee) erreurs.dateArrivee = "Saisissez la date d'arrivée.";
  else if (saisie.dateArrivee < aujourdhui) erreurs.dateArrivee = "La date d'arrivée ne peut pas être dans le passé.";
  if (!saisie.service) erreurs.service = "Choisissez le service.";
  const sansProfil = saisie.applications.filter((a) => !a.profilId);
  if (sansProfil.length) {
    erreurs.applications = Object.fromEntries(sansProfil.map((a) => [a.application, "Choisissez un profil de référence."]));
  }
  return erreurs;
}

/** Ajoute une application (une seule fois), encore sans profil de référence. */
export function ajouterApplication(applications: ApplicationDemandee[], application: string): ApplicationDemandee[] {
  if (!application || applications.some((a) => a.application === application)) return applications;
  return [...applications, { application, profilId: "" }];
}

export function choisirProfil(applications: ApplicationDemandee[], application: string, profilId: string): ApplicationDemandee[] {
  return applications.map((a) => (a.application === application ? { ...a, profilId } : a));
}

export function retirerApplication(applications: ApplicationDemandee[], application: string): ApplicationDemandee[] {
  return applications.filter((a) => a.application !== application);
}

/** Ajoute un répertoire. Renvoie une erreur si le chemin est vide ou déjà présent. */
export function ajouterRepertoire(repertoires: string[], chemin: string): { repertoires: string[]; erreur?: string } {
  const propre = chemin.trim();
  if (!propre) return { repertoires, erreur: "Saisissez le chemin du répertoire." };
  if (repertoires.some((r) => r.toLowerCase() === propre.toLowerCase())) {
    return { repertoires, erreur: "Ce répertoire est déjà dans la liste." };
  }
  return { repertoires: [...repertoires, propre] };
}

export function retirerRepertoire(repertoires: string[], chemin: string): string[] {
  return repertoires.filter((r) => r !== chemin);
}

/** Matériels proposés à l'étape 2, dans cet ordre (articles du catalogue). */
export const MATERIELS_ONBOARDING = ["PC-14", "ECR-24", "TEL", "SCANNER", "IMPRIMANTE", "CASQUE", "SOURIS", "POCHETTE"];

/** Coche ou décoche un matériel. La sélection garde l'ordre de la liste proposée. */
export function basculerMateriel(materiels: string[], articleId: string): string[] {
  if (materiels.includes(articleId)) return materiels.filter((m) => m !== articleId);
  const rang = (id: string) => MATERIELS_ONBOARDING.indexOf(id);
  return [...materiels, articleId].sort((a, b) => rang(a) - rang(b));
}

export function validerMateriel(saisie: SaisieOnboarding): { materiels?: string } {
  return saisie.materiels.length ? {} : { materiels: "Choisissez au moins un matériel." };
}

/** Numéro du prochain dossier : O-001, O-002… */
export function prochainDossierId(demandes: Demande[]): string {
  const max = demandes.reduce((m, d) => Math.max(m, Number(d.onboarding?.dossierId.replace("O-", "")) || 0), 0);
  return `O-${String(max + 1).padStart(3, "0")}`;
}

/** « 2099-01-04 » devient « 04/01/2099 ». */
export function dateFrancaise(dateISO: string): string {
  const [annee, mois, jour] = dateISO.split("-");
  return `${jour}/${mois}/${annee}`;
}

/** Crée une demande « Soumise » par matériel choisi, toutes rattachées au même dossier. La saisie doit avoir été validée. */
export function creerDemandesOnboarding(demandes: Demande[], saisie: SaisieOnboarding, aujourdhui: Date = new Date()): Demande[] {
  const emetteur = personneParId(saisie.emetteurId);
  if (!emetteur) throw new Error(`Émetteur inconnu : ${saisie.emetteurId}`);
  const nouvelArrivant = { prenom: saisie.prenom.trim(), nom: saisie.nom.trim() };
  const onboarding = {
    dossierId: prochainDossierId(demandes),
    dateArrivee: saisie.dateArrivee,
    applications: saisie.applications.map((a) => ({ application: a.application, profilReference: personneParId(a.profilId)?.nom ?? "" })),
    repertoires: saisie.repertoires,
  };
  const creees: Demande[] = [];
  for (const articleId of saisie.materiels) {
    creees.push({
      id: prochainId([...demandes, ...creees]),
      demandeur: emetteur.nom,
      service: emetteur.service,
      articleId,
      quantite: 1,
      motif: `Arrivée de ${nouvelArrivant.prenom} ${nouvelArrivant.nom} (${saisie.service}) le ${dateFrancaise(saisie.dateArrivee)}`,
      statut: "soumise",
      creeLe: dateISO(aujourdhui),
      nouvelArrivant,
      onboarding,
    });
  }
  return creees;
}
