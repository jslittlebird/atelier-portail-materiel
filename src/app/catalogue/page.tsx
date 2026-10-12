// Route de l'epic E1 Catalogue et demande. Le code de l'epic va dans src/features/e1-catalogue/.
import { AConstruire } from "@/components/a-construire";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">E1 Catalogue et demande</h1>
      <AConstruire epic="E1 Catalogue et demande" groupe="groupe 1" description="Le demandeur parcourt le catalogue (recherche, filtre par catégorie, stock et délai visibles) et crée une demande de matériel avec quantité et motif." />
    </div>
  );
}
