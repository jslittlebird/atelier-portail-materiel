import { describe, expect, it } from "vitest";
import { articleParId, catalogue } from "@/lib/domaine";
import { categories, estIndisponible, filtrerParCategorie, libelleDelai, TOUTES_CATEGORIES } from "./regles";

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
