import { STATUTS, type Demande, type Statut } from "@/lib/domaine";

/** Nombre de demandes par statut ; chaque statut est présent, même à 0. */
export function compterParStatut(demandes: Demande[]): Record<Statut, number> {
  const resultat = Object.fromEntries(Object.keys(STATUTS).map((s) => [s, 0])) as Record<Statut, number>;
  for (const d of demandes) resultat[d.statut] += 1;
  return resultat;
}
