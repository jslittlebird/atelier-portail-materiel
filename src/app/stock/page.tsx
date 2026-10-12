// Route de l'epic E3 Stock et livraison. Le code de l'epic va dans src/features/e3-stock/.
import { AConstruire } from "@/components/a-construire";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">E3 Stock et livraison</h1>
      <AConstruire epic="E3 Stock et livraison" groupe="groupe 3" description="Le gestionnaire voit l'état du stock et les alertes de seuil, prépare puis livre les demandes validées." />
    </div>
  );
}
