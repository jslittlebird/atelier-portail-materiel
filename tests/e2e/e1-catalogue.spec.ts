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

test.describe("E1-5 · préparer les accès du nouvel arrivant", () => {
  async function ouvrirAssistant(page: Page) {
    await page.goto("/catalogue");
    await page.getByLabel("Rôle").selectOption("manager");
    await page.getByRole("button", { name: "Préparer l'arrivée d'un nouvel arrivant" }).click();
  }

  async function remplirEtape1(page: Page) {
    await remplirIdentite(page);
    await page.getByLabel("Date d'arrivée").fill("2099-01-04");
    await page.getByLabel("Service", { exact: true }).selectOption("Comptabilité");
  }

  test("sans les champs obligatoires, on reste à l'étape 1 et chaque champ est signalé", async ({ page }) => {
    await ouvrirAssistant(page);
    await page.getByRole("button", { name: "Suivant" }).click();
    for (const message of [
      "Choisissez l'émetteur de la demande.",
      "Saisissez le prénom du nouvel arrivant.",
      "Saisissez le nom du nouvel arrivant.",
      "Saisissez la date d'arrivée.",
      "Choisissez le service.",
    ]) {
      await expect(page.getByText(message)).toBeVisible();
    }
    await expect(page.getByText("Étape 1 sur 2 : Accès")).toBeVisible();
  });

  test("une date d'arrivée passée est refusée", async ({ page }) => {
    await ouvrirAssistant(page);
    await remplirEtape1(page);
    await page.getByLabel("Date d'arrivée").fill("2020-01-06");
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByText("La date d'arrivée ne peut pas être dans le passé.")).toBeVisible();
    await expect(page.getByText("Étape 1 sur 2 : Accès")).toBeVisible();
  });

  test("applications avec profil de référence : recherche, profil obligatoire, plusieurs applications", async ({ page }) => {
    await ouvrirAssistant(page);
    await remplirEtape1(page);
    for (const application of ["Messagerie", "Paie et RH"]) {
      await page.getByLabel("Application à ajouter").selectOption(application);
      await page.getByRole("button", { name: "Ajouter l'application" }).click();
    }
    await expect(page.getByLabel("Application à ajouter").locator("option", { hasText: "Messagerie" })).toHaveCount(0);

    await page.getByLabel("Rechercher un profil pour Messagerie").fill("ma");
    await expect(page.getByLabel("Profil de référence pour Messagerie").locator("option")).toHaveText([
      "Choisir une personne",
      "Mathilde Roux (Comptabilité)",
      "Thomas Garnier (Commercial)",
      "Émilie Marchand (Achats)",
      "Camille Martin (Comptabilité)",
      "Manon Girard (Ressources humaines)",
    ]);
    await page.getByLabel("Profil de référence pour Messagerie").selectOption({ label: "Camille Martin (Comptabilité)" });

    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByRole("listitem", { name: "Paie et RH" })).toContainText("Choisissez un profil de référence.");
    await expect(page.getByRole("listitem", { name: "Messagerie" })).not.toContainText("Choisissez un profil de référence.");

    await page.getByLabel("Profil de référence pour Paie et RH").selectOption({ label: "Manon Girard (Ressources humaines)" });
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByText("Étape 2 sur 2 : Matériel")).toBeVisible();

    // Retour à l'étape 1 : la saisie est conservée.
    await page.getByRole("button", { name: "Précédent" }).click();
    await expect(page.getByLabel("Prénom du nouvel arrivant")).toHaveValue("Léa");
    await expect(page.getByLabel("Profil de référence pour Messagerie")).toHaveValue("P-08");
  });

  test("on ajoute et retire des répertoires, un doublon est refusé", async ({ page }) => {
    await ouvrirAssistant(page);
    const champ = page.getByLabel("Répertoire", { exact: true });
    const liste = page.getByRole("list", { name: "Répertoires demandés" });
    await champ.fill("\\\\partage\\compta\\2026");
    await page.getByRole("button", { name: "Ajouter le répertoire" }).click();
    await champ.fill("\\\\partage\\rh");
    await page.getByRole("button", { name: "Ajouter le répertoire" }).click();
    await expect(liste.getByRole("listitem")).toHaveCount(2);
    await champ.fill("\\\\partage\\rh");
    await page.getByRole("button", { name: "Ajouter le répertoire" }).click();
    await expect(page.getByText("Ce répertoire est déjà dans la liste.")).toBeVisible();
    await page.getByRole("button", { name: "Retirer \\\\partage\\compta\\2026" }).click();
    await expect(liste.getByRole("listitem")).toHaveText(["\\\\partage\\rhRetirer"]);
  });

  test("hors du rôle Manager, l'assistant n'est pas proposé", async ({ page }) => {
    await page.goto("/catalogue");
    await page.getByRole("button", { name: "Préparer l'arrivée d'un nouvel arrivant" }).click();
    await expect(page.getByText("Choisissez « Manager » dans le menu « Je suis » pour préparer une arrivée.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Suivant" })).toHaveCount(0);
  });
});
