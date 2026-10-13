import { describe, expect, it } from "vitest";
import { articleParId, catalogue, demandesDeDepart } from "@/lib/domaine";
import {
  categories,
  creerDemande,
  estIndisponible,
  estValide,
  filtrerParCategorie,
  libelleDelai,
  TOUTES_CATEGORIES,
  validerDemande,
} from "./regles";

describe("E1-1 · consulter le catalogue", () => {
  it("un article sans stock est indisponible", () => {
    expect(estIndisponible(articleParId("TERM-VHU")!)).toBe(true);
  });

  it("un article en stock est disponible", () => {
    expect(estIndisponible(articleParId("ECR-24")!)).toBe(false);
  });

  it("affiche le délai en jours", () => {
    expect(libelleDelai(articleParId("ECR-24")!)).toBe("3 jours");
    expect(libelleDelai({ ...articleParId("ECR-24")!, delaiJours: 1 })).toBe("1 jour");
  });
});

describe("E1-2 · filtrer par catégorie", () => {
  it("liste chaque catégorie une seule fois", () => {
    expect(categories(catalogue)).toEqual(["Poste de travail", "Écran", "Accessoire", "Téléphonie", "Terrain"]);
  });

  it("ne garde que les articles de la catégorie choisie", () => {
    const ecrans = filtrerParCategorie(catalogue, "Écran");
    expect(ecrans.map((a) => a.id)).toEqual(["ECR-24", "ECR-27"]);
  });

  it("« Toutes les catégories » garde tout le catalogue", () => {
    expect(filtrerParCategorie(catalogue, TOUTES_CATEGORIES)).toHaveLength(catalogue.length);
  });
});

describe("E1-3 · créer une demande", () => {
  const motif = "Poste pour un nouvel arrivant";

  it("accepte une quantité entre 1 et 5 et un motif d'au moins 10 caractères", () => {
    expect(validerDemande({ quantite: "1", motif })).toEqual({});
    expect(validerDemande({ quantite: "5", motif: "1234567890" })).toEqual({});
  });

  it.each(["0", "6", "2.5", "", "abc"])("refuse la quantité « %s »", (quantite) => {
    expect(validerDemande({ quantite, motif }).quantite).toMatch("entre 1 et 5");
  });

  it.each(["", "   ", "court", "  123456789  "])("refuse le motif « %s »", (m) => {
    const erreurs = validerDemande({ quantite: "1", motif: m });
    expect(erreurs.motif).toMatch("au moins 10 caractères");
    expect(estValide(erreurs)).toBe(false);
  });

  it("crée une demande soumise avec le prochain numéro", () => {
    const demande = creerDemande(
      demandesDeDepart,
      articleParId("ECR-24")!,
      { quantite: "2", motif: `  ${motif} ` },
      { nom: "Karim Lefèvre", service: "Centre VHU de Lyon" },
      new Date("2026-10-13T09:00:00Z")
    );
    expect(demande).toEqual({
      id: "D-006",
      demandeur: "Karim Lefèvre",
      service: "Centre VHU de Lyon",
      articleId: "ECR-24",
      quantite: 2,
      motif,
      statut: "soumise",
      creeLe: "2026-10-13",
    });
  });
});
