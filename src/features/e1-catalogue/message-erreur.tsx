// Message d'erreur affiché sous un champ (relié au champ par aria-describedby).
export function MessageErreur({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="text-destructive text-sm">{message}</p>;
}
