import { expect, test, type Page } from "@playwright/test";

function ligne(page: Page, nom: string) {
  return page.getByRole("row").filter({ has: page.getByRole("cell", { name: nom, exact: true }) });
}

test.describe("E1-1 · consulter le catalogue", () => {
  test("chaque article affiche son nom, sa catégorie, son stock et son délai", async ({ page }) => {
    await page.goto("/catalogue");
    for (const entete of ["Article", "Catégorie", "Stock", "Délai de livraison"]) {
      await expect(page.getByRole("columnheader", { name: entete })).toBeVisible();
    }
    await expect(ligne(page, "Écran 24 pouces")).toContainText("Écran");
    await expect(ligne(page, "Écran 24 pouces")).toContainText("14");
    await expect(ligne(page, "Écran 24 pouces")).toContainText("3 jours");
  });

  test("un article sans stock est marqué Indisponible et reste affiché", async ({ page }) => {
    await page.goto("/catalogue");
    await expect(ligne(page, "Terminal durci pour centre VHU")).toContainText("Indisponible");
  });

  test("le bouton Demander ouvre la demande de l'article", async ({ page }) => {
    await page.goto("/catalogue");
    await page.getByRole("button", { name: "Demander Écran 27 pouces" }).click();
    await expect(page.getByText("Demander : Écran 27 pouces")).toBeVisible();
  });
});
