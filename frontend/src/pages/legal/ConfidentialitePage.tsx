/** Politique de confidentialité — EduTutor IA (RGPD). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Responsable du traitement',
    hint: 'qui décide pourquoi et comment les données sont traitées.',
    content: (
      <p>
        Le responsable du traitement est l'<strong>Équipe 05 APOCAL'IPSSI</strong>, éditrice
        d'EduTutor IA (cf.{' '}
        <a className="text-indigo-700 underline" href="/legal/mentions-legales">
          mentions légales
        </a>
        ). Contact :{' '}
        <a className="text-indigo-700 underline" href="mailto:equipe05@apocal-ipssi.fr">
          equipe05@apocal-ipssi.fr
        </a>
        .
      </p>
    ),
  },
  {
    title: 'Données personnelles collectées',
    hint: 'email, nom, prénom, documents envoyés, historique de quiz…',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Compte : email, prénom, nom, mot de passe (stocké haché, jamais en clair).</li>
        <li>Profil : statut de vérification email, date d'inscription.</li>
        <li>Contenu : texte de cours ou PDF importé, quiz générés (titre, score, date).</li>
        <li>Questions : énoncés, options et réponses choisies.</li>
        <li>Journaux d'audit RGPD : IP, email et horodatage de chaque export de données.</li>
      </ul>
    ),
  },
  {
    title: 'Finalités du traitement',
    hint: 'pourquoi vous collectez ces données (créer un compte, générer des quiz…).',
    content: (
      <p>
        Les données servent uniquement à : créer et sécuriser le compte, générer des quiz à partir
        des cours importés, restituer scores et historique de révision, et assurer la conformité
        RGPD (traçabilité des demandes d'accès). Aucune donnée n'est utilisée à des fins publicitaires.
      </p>
    ),
  },
  {
    title: 'Base légale',
    hint: 'consentement, contrat, intérêt légitime… (RGPD art. 6).',
    content: (
      <p>
        Le traitement repose sur l'<strong>exécution du service</strong> demandé par l'utilisateur
        (RGPD Art. 6(1)(b)) : les données de compte et de contenu sont nécessaires au fonctionnement
        d'EduTutor IA. Les journaux d'audit reposent sur l'<strong>obligation légale</strong> de
        preuve de conformité (Art. 6(1)(c)).
      </p>
    ),
  },
  {
    title: 'Durée de conservation',
    hint: 'combien de temps les données sont gardées, puis supprimées/anonymisées.',
    content: (
      <p>
        Les données de compte, de cours et de quiz sont conservées{' '}
        <strong>jusqu'à la suppression du compte</strong> par l'utilisateur (suppression définitive,
        en cascade). Les journaux d'audit des exports RGPD sont conservés <strong>3 ans</strong>
        (obligation de preuve CNIL). Le détail figure dans la politique de rétention interne du projet.
      </p>
    ),
  },
  {
    title: 'Destinataires des données',
    hint: 'qui y a accès (équipe, sous-traitants, fournisseurs LLM…).',
    content: (
      <p>
        Les données sont accessibles à l'équipe technique du projet. La génération de quiz s'appuie
        sur un modèle <strong>Llama 3.1 8B exécuté localement via Ollama</strong> : dans la
        configuration par défaut, le contenu des cours <strong>n'est pas transmis à un fournisseur
        d'IA tiers</strong>. Aucune donnée n'est revendue ni partagée à des fins commerciales.
      </p>
    ),
  },
  {
    title: 'Transferts hors UE',
    hint: 'si un fournisseur cloud héberge les données hors Union européenne.',
    content: (
      <p>
        L'application est hébergée sur un <strong>VPS OVHcloud situé dans l'Union européenne</strong>.
        En configuration par défaut (LLM local), <strong>aucun transfert hors UE</strong> n'est réalisé.
        L'activation optionnelle d'un fournisseur LLM externe ferait l'objet d'une mise à jour de la
        présente politique et des garanties de transfert associées.
      </p>
    ),
  },
  {
    title: 'Vos droits',
    hint: 'accès, rectification, suppression, portabilité, opposition, et comment les exercer.',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Accès (Art. 15) & portabilité (Art. 20) : export self-service via <code>GET /api/accounts/me/export/</code> (JSON téléchargeable).</li>
        <li>Rectification (Art. 16) : <code>PATCH /api/accounts/profile/</code>.</li>
        <li>Effacement (Art. 17) : <code>DELETE /api/accounts/profile/</code> — suppression définitive.</li>
        <li>Limitation / opposition (Art. 18) : sur demande à l'équipe (délai 72 h).</li>
      </ul>
    ),
  },
  {
    title: 'Cookies',
    hint: 'renvoi vers la politique de cookies du site.',
    content: (
      <p>
        Le site n'utilise pas de cookies publicitaires. Le détail des technologies de stockage figure
        dans la{' '}
        <a className="text-indigo-700 underline" href="/legal/cookies">
          politique de gestion des cookies
        </a>
        .
      </p>
    ),
  },
  {
    title: 'Contact & réclamation',
    hint: 'email du référent données + droit de réclamation auprès de la CNIL.',
    content: (
      <p>
        Pour exercer vos droits ou toute question :{' '}
        <a className="text-indigo-700 underline" href="mailto:equipe05@apocal-ipssi.fr">
          equipe05@apocal-ipssi.fr
        </a>
        . Vous disposez également du droit d'introduire une réclamation auprès de la{' '}
        <strong>CNIL</strong> (
        <a className="text-indigo-700 underline" href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        ).
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalScaffold
      title="Politique de confidentialité"
      intro="Comment les données personnelles des utilisateurs sont collectées, utilisées et protégées (RGPD)."
      sections={SECTIONS}
      complete
      lastUpdated="01/07/2026"
    />
  );
}
