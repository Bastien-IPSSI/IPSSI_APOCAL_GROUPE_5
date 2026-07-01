/** Politique de gestion des cookies — EduTutor IA. */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: "Qu'est-ce qu'un cookie ?",
    hint: 'définition simple à destination des utilisateurs.',
    content: (
      <p>
        Un cookie (ou technologie de stockage équivalente) est un petit fichier déposé par un site
        dans votre navigateur, permettant par exemple de vous garder connecté d'une page à l'autre.
      </p>
    ),
  },
  {
    title: 'Cookies et stockage utilisés',
    hint: "lister ce que le site dépose (ex. token d'authentification en localStorage).",
    content: (
      <p>
        EduTutor IA n'utilise <strong>ni cookie publicitaire, ni traceur tiers</strong>. Le site
        conserve uniquement votre <strong>jeton d'authentification</strong> dans le{' '}
        <code className="bg-slate-200 px-1 rounded">localStorage</code> du navigateur, afin de
        maintenir votre session ouverte.
      </p>
    ),
  },
  {
    title: 'Finalité de chaque cookie',
    hint: "à quoi sert chaque cookie/stockage (technique, mesure d'audience…).",
    content: (
      <p>
        Le jeton d'authentification a une finalité <strong>strictement technique</strong> (vous
        reconnaître entre deux requêtes). Aucune mesure d'audience ni profilage n'est réalisé.
      </p>
    ),
  },
  {
    title: 'Consentement',
    hint: 'cookies nécessitant un consentement préalable et comment il est recueilli.',
    content: (
      <p>
        Le stockage utilisé étant <strong>strictement nécessaire</strong> au fonctionnement du
        service, il est exempté de consentement préalable (recommandations CNIL). Aucune bannière de
        consentement n'est donc requise en l'état.
      </p>
    ),
  },
  {
    title: 'Durée de conservation',
    hint: 'combien de temps chaque cookie est conservé.',
    content: (
      <p>
        Le jeton est conservé jusqu'à votre <strong>déconnexion</strong>, votre changement de mot de
        passe, ou l'effacement manuel du stockage de votre navigateur.
      </p>
    ),
  },
  {
    title: 'Gérer ou refuser les cookies',
    hint: 'comment paramétrer ou supprimer les cookies (navigateur, bannière).',
    content: (
      <p>
        Vous pouvez à tout moment vider le stockage local via les réglages de votre navigateur ou en
        vous déconnectant. La suppression du jeton met simplement fin à votre session (vous devrez
        vous reconnecter).
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalScaffold
      title="Politique de gestion des cookies"
      intro="Les cookies et technologies de stockage utilisés par le site, et comment les gérer."
      sections={SECTIONS}
      complete
      lastUpdated="01/07/2026"
    >
      <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600">
        ℹ️ Note technique : ce service stocke le{' '}
        <code className="bg-slate-200 px-1 rounded">token</code> d'authentification dans le{' '}
        <code className="bg-slate-200 px-1 rounded">localStorage</code> du navigateur — c'est le seul
        élément persistant côté client.
      </div>
    </LegalScaffold>
  );
}
