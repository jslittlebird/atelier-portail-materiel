import { expect, test } from "@playwright/test";

test("la page d'accueil s'affiche et donne accès aux trois epics", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Portail de demandes de matériel IT" })).toBeVisible();
  for (const nom of ["Catalogue (E1)", "Validation (E2)", "Stock (E3)"]) {
    await expect(page.getByRole("link", { name: nom })).toBeVisible();
  }
});

test("on peut changer de rôle", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Rôle").selectOption("manager");
  await expect(page.getByText("Vous êtes connecté en tant que")).toContainText("Manager");
});
