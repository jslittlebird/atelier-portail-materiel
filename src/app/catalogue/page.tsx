// Route de l'epic E1 Catalogue et demande. Le code de l'epic va dans src/features/e1-catalogue/.
import { CatalogueDemande } from "@/features/e1-catalogue/catalogue-demande";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Catalogue</h1>
        <p className="text-muted-foreground mt-1">Choisissez le matériel de votre nouvel arrivant et faites une demande.</p>
      </div>
      <CatalogueDemande />
    </div>
  );
}
