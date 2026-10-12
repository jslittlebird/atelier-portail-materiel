"use client";

import Link from "next/link";
import { ROLES, type Role } from "@/lib/domaine";
import { useStore } from "@/lib/store";
import { NativeSelect } from "@/components/ui/native-select";

// Navigation : une entrée par epic. Les 3 entrées sont déjà câblées pour éviter les conflits entre groupes.
const LIENS = [
  { href: "/", libelle: "Accueil" },
  { href: "/catalogue", libelle: "Catalogue (E1)" },
  { href: "/validation", libelle: "Validation (E2)" },
  { href: "/stock", libelle: "Stock (E3)" },
];

export function EnTete() {
  const { role, setRole } = useStore();
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-semibold">Portail matériel IT</Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline">{l.libelle}</Link>
          ))}
        </nav>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Je suis</span>
          <NativeSelect aria-label="Rôle" value={role} onChange={(e) => setRole(e.target.value as Role)} className="w-52">
            {Object.entries(ROLES).map(([valeur, libelle]) => (
              <option key={valeur} value={valeur}>{libelle}</option>
            ))}
          </NativeSelect>
        </label>
      </div>
    </header>
  );
}
