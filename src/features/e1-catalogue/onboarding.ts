// Règles de l'assistant « Nouvel arrivant » (E1-5 et E1-6). Fonctions pures, testées dans onboarding.test.ts.

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
};

export const SAISIE_VIDE: SaisieOnboarding = {
  emetteurId: "",
  prenom: "",
  nom: "",
  dateArrivee: "",
  service: "",
  applications: [],
  repertoires: [],
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
