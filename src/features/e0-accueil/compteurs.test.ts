import { describe, expect, it } from "vitest";
import { compterParStatut } from "./compteurs";
import { demandesDeDepart } from "@/lib/domaine";

describe("compterParStatut", () => {
  it("compte une demande par statut dans les données de départ", () => {
    expect(compterParStatut(demandesDeDepart)).toEqual({ soumise: 1, validee: 1, refusee: 1, en_preparation: 1, livree: 1 });
  });

  it("affiche 0 pour un statut sans demande", () => {
    expect(compterParStatut([]).soumise).toBe(0);
  });
});
