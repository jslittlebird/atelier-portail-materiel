import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { EnTete } from "@/components/en-tete";

export const metadata: Metadata = {
  title: "Portail de demandes de matériel IT",
  description: "Projet fil rouge de l'atelier IA (données fictives)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <EnTete />
          <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
          <footer className="text-muted-foreground border-t px-6 py-4 text-center text-xs">
            Projet pédagogique · données fictives · Little Bird
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
