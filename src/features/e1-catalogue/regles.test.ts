import { describe, expect, it } from "vitest";
import { articleParId } from "@/lib/domaine";
import { estIndisponible, libelleDelai } from "./regles";

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
