import { describe, expect, it } from "vitest";
import { ANNUAIRE, filtrerPersonnes, SERVICES } from "./annuaire";
import {
  ajouterApplication,
  ajouterRepertoire,
  choisirProfil,
  retirerApplication,
  retirerRepertoire,
  SAISIE_VIDE,
  validerAcces,
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
