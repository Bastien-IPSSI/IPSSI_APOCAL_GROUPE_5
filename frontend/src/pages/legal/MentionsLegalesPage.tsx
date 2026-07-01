/** Mentions légales — EduTutor IA (projet pédagogique APOCAL'IPSSI, Équipe 05). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Éditeur du site',
    hint: "nom de l'organisation/équipe, statut, adresse, email de contact.",
    content: (
      <>
        <p>
          Le site <strong>EduTutor IA</strong> est édité dans un cadre strictement pédagogique par
          l'<strong>Équipe 05</strong> de la promotion APOCAL'IPSSI 2026, sans but lucratif.
        </p>
        <p className="mt-2">
          Membres : Valentin Louvet, Amine Kaoutar, Erwann Hillion, Alexandre Bonjour, Evan Afonso,
          Bastien Rouvière, Aya Sghaier.
        </p>
        <p className="mt-2">
          Contact : <a className="text-indigo-700 underline" href="mailto:equipe05@apocal-ipssi.fr">equipe05@apocal-ipssi.fr</a>
        </p>
      </>
    ),
  },
  {
    title: 'Directeur de la publication',
    hint: 'nom de la personne responsable du contenu publié.',
    content: (
      <p>
        Le directeur de la publication est le <strong>chef de projet de l'Équipe 05</strong>, agissant
        au nom de l'ensemble de l'équipe pour le compte du projet pédagogique EduTutor IA.
      </p>
    ),
  },
  {
    title: 'Hébergeur',
    hint: "nom, adresse et téléphone de l'hébergeur du site.",
    content: (
      <p>
        L'application est hébergée sur un <strong>VPS OVHcloud</strong> — OVH SAS, 2 rue Kellermann,
        59100 Roubaix, France — dans le cadre du déploiement décrit à la documentation interne
        (<code>docs/11-deploiement-vps-ovh.md</code>). Les données sont hébergées au sein de l'Union
        européenne.
      </p>
    ),
  },
  {
    title: 'Propriété intellectuelle',
    hint: 'à qui appartiennent les textes, logos, code, contenus.',
    content: (
      <p>
        Le code source, les textes et les visuels d'EduTutor IA sont produits par l'Équipe 05 dans un
        cadre pédagogique. Les <strong>contenus de cours uploadés</strong> et les quiz générés restent
        la propriété de leurs auteurs respectifs ; l'utilisateur garantit disposer des droits sur les
        documents qu'il importe. Les marques et technologies tierces (Django, React, Ollama, Llama)
        demeurent la propriété de leurs détenteurs.
      </p>
    ),
  },
  {
    title: 'Protection des données personnelles',
    hint: 'référence RGPD, droits des utilisateurs, contact DPO.',
    content: (
      <p>
        Le traitement des données personnelles est décrit dans la{' '}
        <a className="text-indigo-700 underline" href="/legal/confidentialite">
          politique de confidentialité
        </a>
        . Conformément au RGPD, chaque utilisateur peut exercer ses droits d'accès (Art. 15),
        de rectification (Art. 16), d'effacement (Art. 17) et de portabilité (Art. 20) — notamment via
        l'export self-service de ses données. Les durées de conservation sont détaillées dans la
        politique de rétention interne.
      </p>
    ),
  },
  {
    title: 'Contact',
    hint: 'comment vous joindre pour toute question juridique.',
    content: (
      <p>
        Pour toute question juridique ou relative aux données personnelles :{' '}
        <a className="text-indigo-700 underline" href="mailto:equipe05@apocal-ipssi.fr">
          equipe05@apocal-ipssi.fr
        </a>
        .
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalScaffold
      title="Mentions légales"
      intro="Informations légales obligatoires identifiant l'éditeur et l'hébergeur du site."
      sections={SECTIONS}
      complete
      lastUpdated="01/07/2026"
    />
  );
}
