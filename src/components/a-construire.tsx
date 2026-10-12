import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Écran temporaire affiché tant qu'un epic n'est pas développé.
export function AConstruire({ epic, groupe, description }: { epic: string; groupe: string; description: string }) {
  return (
    <Alert>
      <AlertTitle>{epic} : à construire par le {groupe}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
