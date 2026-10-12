import { expect, test } from "@playwright/test";

test("l'accueil affiche un compteur par statut", async ({ page }) => {
  await page.goto("/");
  for (const s of ["soumise", "validee", "refusee", "en_preparation", "livree"]) {
    await expect(page.getByTestId(`compteur-${s}`)).toHaveText("1");
  }
});
