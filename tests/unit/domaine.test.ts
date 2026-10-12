import { describe, expect, it } from "vitest";
import { changerStatut, demandesDeDepart, enAlerte, peutPasserA, prochainId, articleParId } from "@/lib/domaine";

describe("cycle de vie d'une demande", () => {
  it("une demande soumise peut être validée ou refusée", () => {
    expect(peutPasserA("soumise", "validee")).toBe(true);
    expect(peutPasserA("soumise", "refusee")).toBe(true);
  });

  it("une demande refusée ne peut plus changer de statut", () => {
    const refusee = demandesDeDepart.find((d) => d.statut === "refusee")!;
    expect(() => changerStatut(refusee, "validee")).toThrow("Transition impossible");
  });

  it("on ne peut pas livrer une demande qui n'est pas en préparation", () => {
    const soumise = demandesDeDepart.find((d) => d.statut === "soumise")!;
    expect(() => changerStatut(soumise, "livree")).toThrow();
  });

  it("le changement de statut conserve le commentaire", () => {
    const soumise = demandesDeDepart.find((d) => d.statut === "soumise")!;
    expect(changerStatut(soumise, "refusee", "Budget épuisé").commentaire).toBe("Budget épuisé");
  });
});

describe("outils", () => {
  it("calcule l'identifiant suivant", () => {
    expect(prochainId(demandesDeDepart)).toBe("D-006");
  });

  it("détecte un article sous le seuil d'alerte", () => {
    expect(enAlerte(articleParId("CASQUE")!)).toBe(true);
    expect(enAlerte(articleParId("CLAVIER")!)).toBe(false);
  });
});
