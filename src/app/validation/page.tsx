// Route de l'epic E2 Validation et suivi. Le code de l'epic va dans src/features/e2-validation/.
import { AConstruire } from "@/components/a-construire";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">E2 Validation et suivi</h1>
      <AConstruire epic="E2 Validation et suivi" groupe="groupe 2" description="Le manager voit les demandes soumises, les valide ou les refuse avec un commentaire ; le demandeur suit le statut de ses demandes." />
    </div>
  );
}
