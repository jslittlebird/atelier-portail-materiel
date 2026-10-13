import { describe, expect, it } from "vitest";
import { articleParId, demandesDeDepart } from "@/lib/domaine";
import { ANNUAIRE, filtrerPersonnes, SERVICES } from "./annuaire";
import {
  ajouterApplication,
  ajouterRepertoire,
  basculerMateriel,
  choisirProfil,
  creerDemandesOnboarding,
  dateFrancaise,
  MATERIELS_ONBOARDING,
  prochainDossierId,
  retirerApplication,
  retirerRepertoire,
  SAISIE_VIDE,
  validerAcces,
  validerMateriel,
  type SaisieOnboarding,
} from "./onboarding";
import { dateISO, estValide } from "./regles";

const AUJOURDHUI = "2026-10-13";
const etape1Valide: SaisieOnboarding = {
  ...SAISIE_VIDE,
  emetteurId: "E-01",
  prenom: "Léa",
  nom: "Dupont",
  dateArrivee: "2026-11-02",
  service: "Comptabilité",
};

describe("E1-5 · préparer les accès du nouvel arrivant", () => {
  it("accepte une étape 1 complète, sans application ni répertoire", () => {
    expect(validerAcces(etape1Valide, AUJOURDHUI)).toEqual({});
  });

  it("accepte une arrivée le jour même", () => {
    expect(validerAcces({ ...etape1Valide, dateArrivee: AUJOURDHUI }, AUJOURDHUI)).toEqual({});
  });

  it("refuse une date d'arrivée passée", () => {
    const erreurs = validerAcces({ ...etape1Valide, dateArrivee: "2026-10-12" }, AUJOURDHUI);
    expect(erreurs.dateArrivee).toBe("La date d'arrivée ne peut pas être dans le passé.");
  });

  it("signale chaque champ obligatoire manquant", () => {
    const erreurs = validerAcces(SAISIE_VIDE, AUJOURDHUI);
    expect(Object.keys(erreurs).sort()).toEqual(["dateArrivee", "emetteurId", "nom", "prenom", "service"]);
    expect(estValide(erreurs)).toBe(false);
  });

  it("le service se choisit dans la liste des services de l'annuaire", () => {
    expect(SERVICES).toContain("Comptabilité");
    expect(new Set(SERVICES).size).toBe(SERVICES.length);
  });

  it("ajoute plusieurs applications, chacune une seule fois, puis leur profil de référence", () => {
    let apps = ajouterApplication([], "Messagerie");
    apps = ajouterApplication(apps, "Paie et RH");
    apps = ajouterApplication(apps, "Messagerie");
    expect(apps.map((a) => a.application)).toEqual(["Messagerie", "Paie et RH"]);
    apps = choisirProfil(apps, "Messagerie", "P-08");
    expect(apps).toEqual([
      { application: "Messagerie", profilId: "P-08" },
      { application: "Paie et RH", profilId: "" },
    ]);
    expect(retirerApplication(apps, "Paie et RH")).toHaveLength(1);
  });

  it("bloque une application sans profil de référence et la signale", () => {
    const applications = choisirProfil(ajouterApplication(ajouterApplication([], "Messagerie"), "Intranet"), "Intranet", "P-09");
    const erreurs = validerAcces({ ...etape1Valide, applications }, AUJOURDHUI);
    expect(erreurs.applications).toEqual({ Messagerie: "Choisissez un profil de référence." });
    expect(estValide(erreurs)).toBe(false);
  });

  it("la recherche d'un profil filtre l'annuaire sans tenir compte des accents", () => {
    expect(filtrerPersonnes(ANNUAIRE, "ma").map((p) => p.nom)).toEqual([
      "Mathilde Roux",
      "Thomas Garnier",
      "Émilie Marchand",
      "Camille Martin",
      "Manon Girard",
    ]);
    expect(filtrerPersonnes(ANNUAIRE, "ines").map((p) => p.nom)).toEqual(["Inès Petit"]);
  });

  it("ajoute et retire des répertoires, refuse un chemin vide ou en double", () => {
    let { repertoires } = ajouterRepertoire([], "  \\\\partage\\compta\\2026 ");
    expect(repertoires).toEqual(["\\\\partage\\compta\\2026"]);
    expect(ajouterRepertoire(repertoires, "\\\\PARTAGE\\compta\\2026").erreur).toBe("Ce répertoire est déjà dans la liste.");
    expect(ajouterRepertoire(repertoires, "   ").erreur).toBe("Saisissez le chemin du répertoire.");
    repertoires = ajouterRepertoire(repertoires, "\\\\partage\\rh").repertoires;
    expect(retirerRepertoire(repertoires, "\\\\partage\\compta\\2026")).toEqual(["\\\\partage\\rh"]);
  });

  it("formate la date du jour en AAAA-MM-JJ", () => {
    expect(dateISO(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("E1-6 · choisir le matériel du nouvel arrivant", () => {
  it("propose les 8 matériels attendus, tous présents dans le catalogue", () => {
    expect(MATERIELS_ONBOARDING.map((id) => articleParId(id)?.nom)).toEqual([
      "Ordinateur portable 14 pouces",
      "Écran 24 pouces",
      "Téléphone mobile professionnel",
      "Scanner de documents",
      "Imprimante de bureau",
      "Casque audio avec micro",
      "Souris filaire",
      "Pochette de transport pour portable",
    ]);
  });

  it("coche plusieurs matériels dans l'ordre de la liste, et décoche", () => {
    let materiels = basculerMateriel([], "SOURIS");
    materiels = basculerMateriel(materiels, "PC-14");
    materiels = basculerMateriel(materiels, "ECR-24");
    expect(materiels).toEqual(["PC-14", "ECR-24", "SOURIS"]);
    expect(basculerMateriel(materiels, "ECR-24")).toEqual(["PC-14", "SOURIS"]);
  });

  it("exige au moins un matériel", () => {
    expect(validerMateriel(etape1Valide).materiels).toBe("Choisissez au moins un matériel.");
    expect(validerMateriel({ ...etape1Valide, materiels: ["PC-14"] })).toEqual({});
  });

  it("numérote les dossiers O-001, O-002…", () => {
    expect(prochainDossierId(demandesDeDepart)).toBe("O-001");
    const premier = creerDemandesOnboarding(demandesDeDepart, { ...etape1Valide, materiels: ["PC-14"] });
    expect(prochainDossierId([...demandesDeDepart, ...premier])).toBe("O-002");
  });

  it("crée une demande soumise par matériel, toutes rattachées au même dossier", () => {
    const saisie: SaisieOnboarding = {
      ...etape1Valide,
      applications: [{ application: "Messagerie", profilId: "P-08" }],
      repertoires: ["\\\\partage\\compta"],
      materiels: ["PC-14", "ECR-24"],
    };
    const creees = creerDemandesOnboarding(demandesDeDepart, saisie, new Date(2026, 9, 13));
    expect(creees.map((d) => [d.id, d.articleId, d.quantite, d.statut])).toEqual([
      ["D-006", "PC-14", 1, "soumise"],
      ["D-007", "ECR-24", 1, "soumise"],
    ]);
    expect(creees[0]).toMatchObject({
      demandeur: "Karim Lefèvre",
      service: "Centre VHU de Lyon",
      creeLe: "2026-10-13",
      motif: "Arrivée de Léa Dupont (Comptabilité) le 02/11/2026",
      nouvelArrivant: { prenom: "Léa", nom: "Dupont" },
      onboarding: {
        dossierId: "O-001",
        dateArrivee: "2026-11-02",
        applications: [{ application: "Messagerie", profilReference: "Camille Martin" }],
        repertoires: ["\\\\partage\\compta"],
      },
    });
    expect(creees[1].onboarding).toEqual(creees[0].onboarding);
  });

  it("affiche la date au format français", () => {
    expect(dateFrancaise("2099-01-04")).toBe("04/01/2099");
  });
});
