import { describe, expect, it } from "vitest";
import { articleParId, catalogue, demandesDeDepart } from "@/lib/domaine";
import {
  categories,
  creerDemande,
  estIndisponible,
  estValide,
  filtrerParCategorie,
  libelleDelai,
  filtrerEmetteurs,
  TOUTES_CATEGORIES,
  validerDemande,
  type Emetteur,
  type SaisieDemande,
} from "./regles";
import emetteursFictifs from "./emetteurs.json";

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

const saisieValide: SaisieDemande = {
  emetteurId: "E-01",
  prenom: "Léa",
  nom: "Dupont",
  quantite: "1",
  motif: "Poste pour un nouvel arrivant",
};
const karim: Emetteur = { id: "E-01", nom: "Karim Lefèvre", service: "Centre VHU de Lyon" };

describe("E1-3 · créer une demande", () => {
  it("accepte une quantité entre 1 et 5 et un motif d'au moins 10 caractères", () => {
    expect(validerDemande(saisieValide)).toEqual({});
    expect(validerDemande({ ...saisieValide, quantite: "5", motif: "1234567890" })).toEqual({});
  });

  it.each(["0", "6", "2.5", "", "abc"])("refuse la quantité « %s »", (quantite) => {
    expect(validerDemande({ ...saisieValide, quantite }).quantite).toMatch("entre 1 et 5");
  });

  it.each(["", "   ", "court", "  123456789  "])("refuse le motif « %s »", (motif) => {
    const erreurs = validerDemande({ ...saisieValide, motif });
    expect(erreurs.motif).toMatch("au moins 10 caractères");
    expect(estValide(erreurs)).toBe(false);
  });

  it("crée une demande soumise avec le prochain numéro", () => {
    const demande = creerDemande(
      demandesDeDepart,
      articleParId("ECR-24")!,
      { ...saisieValide, quantite: "2", motif: "  Poste pour un nouvel arrivant " },
      karim,
      new Date("2026-10-13T09:00:00Z")
    );
    expect(demande).toMatchObject({
      id: "D-006",
      articleId: "ECR-24",
      quantite: 2,
      motif: "Poste pour un nouvel arrivant",
      statut: "soumise",
      creeLe: "2026-10-13",
    });
  });
});

describe("E1-4 · identifier l'émetteur et le nouvel arrivant", () => {
  const emetteurs = emetteursFictifs as Emetteur[];

  it("la demande porte le nom et le service de l'émetteur, et le nouvel arrivant", () => {
    const demande = creerDemande(demandesDeDepart, articleParId("PC-14")!, { ...saisieValide, prenom: " Léa ", nom: "Dupont " }, karim);
    expect(demande.demandeur).toBe("Karim Lefèvre");
    expect(demande.service).toBe("Centre VHU de Lyon");
    expect(demande.nouvelArrivant).toEqual({ prenom: "Léa", nom: "Dupont" });
  });

  it("la recherche ne garde que les noms qui contiennent le texte saisi", () => {
    expect(filtrerEmetteurs(emetteurs, "ma").map((e) => e.nom)).toEqual(["Mathilde Roux", "Thomas Garnier", "Émilie Marchand"]);
  });

  it("la recherche ignore les majuscules et les accents", () => {
    expect(filtrerEmetteurs(emetteurs, "EMILIE").map((e) => e.nom)).toEqual(["Émilie Marchand"]);
    expect(filtrerEmetteurs(emetteurs, "lefevre").map((e) => e.nom)).toEqual(["Karim Lefèvre"]);
  });

  it("une recherche vide propose tous les émetteurs", () => {
    expect(filtrerEmetteurs(emetteurs, "")).toHaveLength(emetteurs.length);
  });

  it.each([
    ["emetteurId", "Choisissez l'émetteur"],
    ["prenom", "Saisissez le prénom"],
    ["nom", "Saisissez le nom"],
  ] as const)("bloque la demande si « %s » est vide", (champ, message) => {
    const erreurs = validerDemande({ ...saisieValide, [champ]: champ === "emetteurId" ? "" : "  " });
    expect(erreurs[champ]).toMatch(message);
    expect(estValide(erreurs)).toBe(false);
  });
});
