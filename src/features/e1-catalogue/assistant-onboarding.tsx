"use client";

// Assistant « Nouvel arrivant » : étape 1 Accès (E1-5), étape 2 Matériel et récapitulatif (E1-6). Réservé au rôle Manager.
import * as React from "react";
import { articleParId, type Demande } from "@/lib/domaine";
import { useStore } from "@/lib/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { ANNUAIRE, APPLICATIONS, EMETTEURS, personneParId, SERVICES } from "./annuaire";
import { ChoixPersonne } from "./choix-personne";
import { MessageErreur } from "./message-erreur";
import {
  ajouterApplication,
  ajouterRepertoire,
  basculerMateriel,
  choisirProfil,
  creerDemandesOnboarding,
  dateFrancaise,
  MATERIELS_ONBOARDING,
  retirerApplication,
  retirerRepertoire,
  SAISIE_VIDE,
  validerAcces,
  validerMateriel,
  type ErreursAcces,
  type SaisieOnboarding,
} from "./onboarding";
import { dateISO, estIndisponible, estValide } from "./regles";

const ETAPES = ["Accès", "Matériel", "Récapitulatif"];

type Props = {
  onFermer: () => void;
  /** Appelé avec les demandes créées (une par matériel) après l'envoi du dossier. */
  onSoumis: (demandes: Demande[]) => void;
};

export function AssistantOnboarding({ onFermer, onSoumis }: Props) {
  const { role, demandes, setDemandes } = useStore();
  const [etape, setEtape] = React.useState(1);
  const [saisie, setSaisie] = React.useState<SaisieOnboarding>(SAISIE_VIDE);
  const [erreurs, setErreurs] = React.useState<ErreursAcces>({});
  const [erreurMateriel, setErreurMateriel] = React.useState<string>();

  function modifier(champs: Partial<SaisieOnboarding>) {
    setSaisie((s) => ({ ...s, ...champs }));
  }

  function suivant() {
    if (etape === 1) {
      const trouvees = validerAcces(saisie, dateISO(new Date()));
      setErreurs(trouvees);
      if (estValide(trouvees)) setEtape(2);
    } else {
      const trouvee = validerMateriel(saisie).materiels;
      setErreurMateriel(trouvee);
      if (!trouvee) setEtape(3);
    }
  }

  function soumettre() {
    const creees = creerDemandesOnboarding(demandes, saisie);
    setDemandes((d) => [...d, ...creees]);
    onSoumis(creees);
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
      ) : (
        <>
          <CardContent>
            {etape === 1 && <EtapeAcces saisie={saisie} modifier={modifier} erreurs={erreurs} />}
            {etape === 2 && <EtapeMateriel saisie={saisie} modifier={modifier} erreur={erreurMateriel} />}
            {etape === 3 && <Recapitulatif saisie={saisie} />}
          </CardContent>
          <CardFooter className="justify-between">
            {etape > 1 ? <Button variant="outline" onClick={() => setEtape(etape - 1)}>Précédent</Button> : <span />}
            {etape < 3 ? <Button onClick={suivant}>Suivant</Button> : <Button onClick={soumettre}>Soumettre le dossier</Button>}
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

function EtapeMateriel({ saisie, modifier, erreur }: Omit<PropsEtape, "erreurs"> & { erreur?: string }) {
  return (
    <fieldset className="space-y-3" aria-describedby="erreur-materiels">
      <legend className="mb-3 font-medium">Matériels pour le nouvel arrivant (un exemplaire de chacun)</legend>
      {MATERIELS_ONBOARDING.map((id) => {
        const article = articleParId(id);
        if (!article) return null;
        return (
          <div key={id} className="flex items-center gap-3">
            <input
              id={`materiel-${id}`}
              type="checkbox"
              className="size-4"
              checked={saisie.materiels.includes(id)}
              onChange={() => modifier({ materiels: basculerMateriel(saisie.materiels, id) })}
            />
            <Label htmlFor={`materiel-${id}`}>{article.nom}</Label>
            {estIndisponible(article) && <Badge variant="destructive">Indisponible</Badge>}
          </div>
        );
      })}
      <MessageErreur id="erreur-materiels" message={erreur} />
    </fieldset>
  );
}

function Recapitulatif({ saisie }: { saisie: SaisieOnboarding }) {
  const emetteur = personneParId(saisie.emetteurId);
  return (
    <dl aria-label="Récapitulatif" className="grid gap-x-6 gap-y-3 text-sm md:grid-cols-[12rem_1fr]">
      <dt className="text-muted-foreground">Nouvel arrivant</dt>
      <dd>{saisie.prenom} {saisie.nom}</dd>
      <dt className="text-muted-foreground">Arrivée</dt>
      <dd>le {dateFrancaise(saisie.dateArrivee)}, service {saisie.service}</dd>
      <dt className="text-muted-foreground">Émetteur</dt>
      <dd>{emetteur?.nom} ({emetteur?.service})</dd>
      <dt className="text-muted-foreground">Applications</dt>
      <dd>
        {saisie.applications.length === 0 ? "Aucune" : (
          <ul>
            {saisie.applications.map((a) => (
              <li key={a.application}>{a.application} · profil de {personneParId(a.profilId)?.nom}</li>
            ))}
          </ul>
        )}
      </dd>
      <dt className="text-muted-foreground">Répertoires</dt>
      <dd>
        {saisie.repertoires.length === 0 ? "Aucun" : (
          <ul>
            {saisie.repertoires.map((r) => <li key={r}><code>{r}</code></li>)}
          </ul>
        )}
      </dd>
      <dt className="text-muted-foreground">Matériels</dt>
      <dd>
        <ul>
          {saisie.materiels.map((id) => <li key={id}>{articleParId(id)?.nom}</li>)}
        </ul>
      </dd>
    </dl>
  );
}
