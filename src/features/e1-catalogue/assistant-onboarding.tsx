"use client";

// Assistant « Nouvel arrivant » : étape 1 Accès (E1-5), étape 2 Matériel (E1-6). Réservé au rôle Manager.
import * as React from "react";
import { useStore } from "@/lib/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { ANNUAIRE, APPLICATIONS, EMETTEURS, SERVICES } from "./annuaire";
import { ChoixPersonne } from "./choix-personne";
import { MessageErreur } from "./message-erreur";
import {
  ajouterApplication,
  ajouterRepertoire,
  choisirProfil,
  retirerApplication,
  retirerRepertoire,
  SAISIE_VIDE,
  validerAcces,
  type ErreursAcces,
  type SaisieOnboarding,
} from "./onboarding";
import { dateISO, estValide } from "./regles";

const ETAPES = ["Accès", "Matériel"];

type Props = { onFermer: () => void };

export function AssistantOnboarding({ onFermer }: Props) {
  const { role } = useStore();
  const [etape, setEtape] = React.useState(1);
  const [saisie, setSaisie] = React.useState<SaisieOnboarding>(SAISIE_VIDE);
  const [erreurs, setErreurs] = React.useState<ErreursAcces>({});

  function modifier(champs: Partial<SaisieOnboarding>) {
    setSaisie((s) => ({ ...s, ...champs }));
  }

  function suivant() {
    const trouvees = validerAcces(saisie, dateISO(new Date()));
    setErreurs(trouvees);
    if (estValide(trouvees)) setEtape(2);
  }

  return (
    <Card aria-label="Nouvel arrivant">
      <CardHeader className="flex items-start justify-between">
        <div className="space-y-1.5">
          <CardTitle>Nouvel arrivant</CardTitle>
          <CardDescription>Étape {etape} sur {ETAPES.length} : {ETAPES[etape - 1]}</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={onFermer}>Fermer</Button>
      </CardHeader>
      {role !== "manager" ? (
        <CardContent>
          <Alert>
            <AlertTitle>Demande réservée aux managers</AlertTitle>
            <AlertDescription>Choisissez « Manager » dans le menu « Je suis » pour préparer une arrivée.</AlertDescription>
          </Alert>
        </CardContent>
      ) : etape === 1 ? (
        <>
          <CardContent>
            <EtapeAcces saisie={saisie} modifier={modifier} erreurs={erreurs} />
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={suivant}>Suivant</Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className="text-muted-foreground text-sm">Choix du matériel : à venir (E1-6).</CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setEtape(1)}>Précédent</Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

type PropsEtape = {
  saisie: SaisieOnboarding;
  modifier: (champs: Partial<SaisieOnboarding>) => void;
  erreurs: ErreursAcces;
};

function EtapeAcces({ saisie, modifier, erreurs }: PropsEtape) {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2">
        <h3 className="font-medium md:col-span-2">Émetteur et nouvel arrivant</h3>
        <ChoixPersonne
          id="emetteur"
          libelle="Émetteur"
          libelleRecherche="Rechercher un émetteur"
          invite="Choisir un émetteur"
          personnes={EMETTEURS}
          valeur={saisie.emetteurId}
          onChange={(emetteurId) => modifier({ emetteurId })}
          erreur={erreurs.emetteurId}
        />
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom du nouvel arrivant</Label>
          <Input id="prenom" value={saisie.prenom} onChange={(e) => modifier({ prenom: e.target.value })} aria-invalid={!!erreurs.prenom} aria-describedby="erreur-prenom" />
          <MessageErreur id="erreur-prenom" message={erreurs.prenom} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nom">Nom du nouvel arrivant</Label>
          <Input id="nom" value={saisie.nom} onChange={(e) => modifier({ nom: e.target.value })} aria-invalid={!!erreurs.nom} aria-describedby="erreur-nom" />
          <MessageErreur id="erreur-nom" message={erreurs.nom} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date-arrivee">Date d&apos;arrivée</Label>
          <Input
            id="date-arrivee"
            type="date"
            value={saisie.dateArrivee}
            onChange={(e) => modifier({ dateArrivee: e.target.value })}
            aria-invalid={!!erreurs.dateArrivee}
            aria-describedby="erreur-date-arrivee"
          />
          <MessageErreur id="erreur-date-arrivee" message={erreurs.dateArrivee} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <NativeSelect id="service" value={saisie.service} onChange={(e) => modifier({ service: e.target.value })} aria-invalid={!!erreurs.service} aria-describedby="erreur-service">
            <option value="">Choisir un service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </NativeSelect>
          <MessageErreur id="erreur-service" message={erreurs.service} />
        </div>
      </section>
      <SectionApplications saisie={saisie} modifier={modifier} erreurs={erreurs} />
      <SectionRepertoires saisie={saisie} modifier={modifier} />
    </div>
  );
}

function SectionApplications({ saisie, modifier, erreurs }: PropsEtape) {
  const disponibles = APPLICATIONS.filter((a) => !saisie.applications.some((d) => d.application === a));
  const [aAjouter, setAAjouter] = React.useState("");

  function ajouter() {
    modifier({ applications: ajouterApplication(saisie.applications, aAjouter) });
    setAAjouter("");
  }

  return (
    <section className="space-y-4">
      <h3 className="font-medium">Applications</h3>
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-56 space-y-2">
          <Label htmlFor="application">Application à ajouter</Label>
          <NativeSelect id="application" value={aAjouter} onChange={(e) => setAAjouter(e.target.value)}>
            <option value="">Choisir une application</option>
            {disponibles.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </NativeSelect>
        </div>
        <Button variant="outline" onClick={ajouter} disabled={!aAjouter}>Ajouter l&apos;application</Button>
      </div>
      {saisie.applications.length === 0 ? (
        <p className="text-muted-foreground text-sm">Aucune application ajoutée.</p>
      ) : (
        <ul className="space-y-4">
          {saisie.applications.map((a, i) => (
            <li key={a.application} aria-label={a.application} className="grid gap-4 rounded-md border p-4 md:grid-cols-[1fr_1fr_auto]">
              <p className="font-medium md:col-span-3">{a.application}</p>
              <ChoixPersonne
                id={`profil-${i}`}
                libelle={<>Profil de référence<span className="sr-only"> pour {a.application}</span></>}
                libelleRecherche={<>Rechercher un profil<span className="sr-only"> pour {a.application}</span></>}
                personnes={ANNUAIRE}
                avecService
                valeur={a.profilId}
                onChange={(profilId) => modifier({ applications: choisirProfil(saisie.applications, a.application, profilId) })}
                erreur={erreurs.applications?.[a.application]}
              />
              <Button
                variant="ghost"
                size="sm"
                className="self-end"
                aria-label={`Retirer ${a.application}`}
                onClick={() => modifier({ applications: retirerApplication(saisie.applications, a.application) })}
              >
                Retirer
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function SectionRepertoires({ saisie, modifier }: Omit<PropsEtape, "erreurs">) {
  const [chemin, setChemin] = React.useState("");
  const [erreur, setErreur] = React.useState<string>();

  function ajouter() {
    const resultat = ajouterRepertoire(saisie.repertoires, chemin);
    setErreur(resultat.erreur);
    if (!resultat.erreur) {
      modifier({ repertoires: resultat.repertoires });
      setChemin("");
    }
  }

  return (
    <section className="space-y-4">
      <h3 className="font-medium">Accès aux répertoires</h3>
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-72 space-y-2">
          <Label htmlFor="repertoire">Répertoire</Label>
          <Input
            id="repertoire"
            placeholder="\\partage\service\dossier"
            value={chemin}
            onChange={(e) => setChemin(e.target.value)}
            aria-invalid={!!erreur}
            aria-describedby="erreur-repertoire"
          />
        </div>
        <Button variant="outline" onClick={ajouter}>Ajouter le répertoire</Button>
      </div>
      <MessageErreur id="erreur-repertoire" message={erreur} />
      {saisie.repertoires.length === 0 ? (
        <p className="text-muted-foreground text-sm">Aucun répertoire ajouté.</p>
      ) : (
        <ul aria-label="Répertoires demandés" className="space-y-2">
          {saisie.repertoires.map((r) => (
            <li key={r} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <code>{r}</code>
              <Button variant="ghost" size="sm" aria-label={`Retirer ${r}`} onClick={() => modifier({ repertoires: retirerRepertoire(saisie.repertoires, r) })}>
                Retirer
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
