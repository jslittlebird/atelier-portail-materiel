"use client";

// État partagé de l'application : rôle courant et demandes.
// Les données vivent dans le navigateur (localStorage) : pas de serveur, pas de base de données.
import * as React from "react";
import { demandesDeDepart, type Demande, type Role } from "@/lib/domaine";

type Etat = {
  role: Role;
  setRole: (r: Role) => void;
  demandes: Demande[];
  setDemandes: (fn: (d: Demande[]) => Demande[]) => void;
  reinitialiser: () => void;
};

const Contexte = React.createContext<Etat | null>(null);
const CLE = "portail-materiel:v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = React.useState<Role>("demandeur");
  const [demandes, setDemandesState] = React.useState<Demande[]>(demandesDeDepart);

  React.useEffect(() => {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) {
        const sauve = JSON.parse(brut) as { role: Role; demandes: Demande[] };
        // Lecture du navigateur après le premier rendu (évite un écart entre serveur et navigateur).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRole(sauve.role);
        setDemandesState(sauve.demandes);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(CLE, JSON.stringify({ role, demandes }));
    } catch {}
  }, [role, demandes]);

  const valeur: Etat = {
    role,
    setRole,
    demandes,
    setDemandes: (fn) => setDemandesState((d) => fn(d)),
    reinitialiser: () => {
      setDemandesState(demandesDeDepart);
      setRole("demandeur");
    },
  };

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>;
}

export function useStore(): Etat {
  const ctx = React.useContext(Contexte);
  if (!ctx) throw new Error("useStore doit être utilisé dans <StoreProvider>");
  return ctx;
}
