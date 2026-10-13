import { expect, test, type Page } from "@playwright/test";

async function ouvrirDemandeEnManager(page: Page, article = "Écran 24 pouces") {
  await page.goto("/catalogue");
  await page.getByLabel("Rôle").selectOption("manager");
  await page.getByRole("button", { name: `Demander ${article}` }).click();
}

async function remplirIdentite(page: Page) {
  await page.getByLabel("Émetteur", { exact: true }).selectOption({ label: "Karim Lefèvre" });
  await page.getByLabel("Prénom du nouvel arrivant").fill("Léa");
  await page.getByLabel("Nom du nouvel arrivant", { exact: true }).fill("Dupont");
}

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

test.describe("E1-2 · filtrer par catégorie", () => {
  test("le filtre propose toutes les catégories une seule fois", async ({ page }) => {
    await page.goto("/catalogue");
    await expect(page.getByLabel("Catégorie").locator("option")).toHaveText([
      "Toutes les catégories",
      "Poste de travail",
      "Écran",
      "Accessoire",
      "Téléphonie",
      "Terrain",
    ]);
  });

  test("choisir « Écran » n'affiche que les écrans, « Toutes les catégories » affiche tout", async ({ page }) => {
    await page.goto("/catalogue");
    const lignes = page.getByRole("table", { name: "Catalogue" }).getByRole("row");
    await page.getByLabel("Catégorie").selectOption("Écran");
    await expect(lignes).toHaveCount(3); // en-tête + 2 écrans
    await expect(ligne(page, "Écran 24 pouces")).toBeVisible();
    await expect(ligne(page, "Écran 27 pouces")).toBeVisible();
    await page.getByLabel("Catégorie").selectOption({ label: "Toutes les catégories" });
    await expect(lignes).toHaveCount(10); // en-tête + 9 articles
  });
});

test.describe("E1-3 · créer une demande", () => {
  test("une demande valide est créée au statut Soumise avec son numéro", async ({ page }) => {
    await ouvrirDemandeEnManager(page);
    await remplirIdentite(page);
    await page.getByLabel("Quantité").fill("2");
    await page.getByLabel("Motif").fill("Second écran pour le nouvel arrivant");
    await page.getByRole("button", { name: "Soumettre la demande" }).click();
    await expect(page.getByText("Demande D-006 soumise")).toBeVisible();
    await expect(page.getByText("Écran 24 pouces × 2 · statut « Soumise »")).toBeVisible();
  });

  test("un motif vide ou trop court affiche une erreur et ne crée pas de demande", async ({ page }) => {
    await ouvrirDemandeEnManager(page);
    await remplirIdentite(page);
    await page.getByRole("button", { name: "Soumettre la demande" }).click();
    await expect(page.getByText("Le motif doit contenir au moins 10 caractères.")).toBeVisible();
    await page.getByLabel("Motif").fill("court");
    await page.getByRole("button", { name: "Soumettre la demande" }).click();
    await expect(page.getByText("Le motif doit contenir au moins 10 caractères.")).toBeVisible();
    await expect(page.getByText(/Demande D-\d+ soumise/)).toHaveCount(0);
    // Aucune demande n'a été créée : la suivante prend bien le numéro D-006.
    await page.getByLabel("Motif").fill("Second écran pour le nouvel arrivant");
    await page.getByRole("button", { name: "Soumettre la demande" }).click();
    await expect(page.getByText("Demande D-006 soumise")).toBeVisible();
  });

  test("une quantité hors de 1 à 5 affiche une erreur", async ({ page }) => {
    await ouvrirDemandeEnManager(page);
    await remplirIdentite(page);
    await page.getByLabel("Quantité").fill("6");
    await page.getByLabel("Motif").fill("Second écran pour le nouvel arrivant");
    await page.getByRole("button", { name: "Soumettre la demande" }).click();
    await expect(page.getByText("La quantité doit être un nombre entier entre 1 et 5.")).toBeVisible();
    await expect(page.getByText(/Demande D-\d+ soumise/)).toHaveCount(0);
  });

  test("hors du rôle Manager, le formulaire n'est pas proposé", async ({ page }) => {
    await page.goto("/catalogue");
    await page.getByRole("button", { name: "Demander Écran 24 pouces" }).click();
    await expect(page.getByText("Choisissez « Manager » dans le menu « Je suis »")).toBeVisible();
    await expect(page.getByRole("button", { name: "Soumettre la demande" })).toHaveCount(0);
  });
});

test.describe("E1-4 · identifier l'émetteur et le nouvel arrivant", () => {
  test("la demande porte l'émetteur choisi et le nouvel arrivant, visibles dans le récapitulatif", async ({ page }) => {
    await ouvrirDemandeEnManager(page, "Ordinateur portable 14 pouces");
    await remplirIdentite(page);
    await page.getByLabel("Motif").fill("Poste pour l'arrivée de Léa");
    await page.getByRole("button", { name: "Soumettre la demande" }).click();
    await expect(page.getByText("Demande D-006 soumise")).toBeVisible();
    await expect(page.getByText("Émetteur : Karim Lefèvre (Centre VHU de Lyon)")).toBeVisible();
    await expect(page.getByText("Pour : Léa Dupont")).toBeVisible();
  });

  test("la recherche filtre la liste des émetteurs", async ({ page }) => {
    await ouvrirDemandeEnManager(page);
    await page.getByLabel("Rechercher un émetteur").fill("ma");
    await expect(page.getByLabel("Émetteur", { exact: true }).locator("option")).toHaveText([
      "Choisir un émetteur",
      "Mathilde Roux",
      "Thomas Garnier",
      "Émilie Marchand",
    ]);
    await page.getByLabel("Rechercher un émetteur").fill("emilie");
    await expect(page.getByLabel("Émetteur", { exact: true }).locator("option")).toHaveText(["Choisir un émetteur", "Émilie Marchand"]);
  });

  test("sans émetteur, prénom ni nom, la demande est bloquée et chaque champ est signalé", async ({ page }) => {
    await ouvrirDemandeEnManager(page);
    await page.getByLabel("Motif").fill("Second écran pour le nouvel arrivant");
    await page.getByRole("button", { name: "Soumettre la demande" }).click();
    await expect(page.getByText("Choisissez l'émetteur de la demande.")).toBeVisible();
    await expect(page.getByText("Saisissez le prénom du nouvel arrivant.")).toBeVisible();
    await expect(page.getByText("Saisissez le nom du nouvel arrivant.")).toBeVisible();
    await expect(page.getByText(/Demande D-\d+ soumise/)).toHaveCount(0);
  });
});
