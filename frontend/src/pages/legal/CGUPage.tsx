/** Conditions Générales d'Utilisation — EduTutor IA. */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Objet',
    hint: 'ce que régissent ces CGU et le service concerné (EduTutor IA).',
    content: (
      <p>
        Les présentes conditions régissent l'utilisation d'<strong>EduTutor IA</strong>, un service
        pédagogique permettant de générer des quiz d'entraînement (QCM) à partir d'un cours importé,
        de les passer et d'en suivre les résultats.
      </p>
    ),
  },
  {
    title: 'Acceptation des conditions',
    hint: "comment l'utilisateur accepte les CGU (inscription, usage…).",
    content: (
      <p>
        La création d'un compte et l'utilisation du service valent acceptation pleine et entière des
        présentes CGU. L'utilisateur qui n'y adhère pas doit renoncer à utiliser le service.
      </p>
    ),
  },
  {
    title: 'Accès au service',
    hint: "conditions d'accès, disponibilité, prérequis techniques.",
    content: (
      <p>
        L'accès nécessite un compte et un navigateur web récent. S'agissant d'un{' '}
        <strong>projet pédagogique</strong>, le service est fourni « en l'état », sans garantie de
        disponibilité continue ni de conservation pérenne des données.
      </p>
    ),
  },
  {
    title: 'Compte utilisateur',
    hint: 'création, responsabilité du mot de passe, exactitude des informations.',
    content: (
      <p>
        L'utilisateur fournit des informations exactes et reste responsable de la confidentialité de
        son mot de passe et de toute activité réalisée depuis son compte. Le mot de passe est stocké
        de façon <strong>hachée</strong> et n'est jamais accessible en clair.
      </p>
    ),
  },
  {
    title: 'Comportements interdits',
    hint: 'usages abusifs, contenus illicites, atteinte à la sécurité.',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Importer des contenus illicites ou dont on ne détient pas les droits.</li>
        <li>Tenter de détourner le générateur (injection de prompt, contournement des règles de sécurité).</li>
        <li>Porter atteinte à la sécurité ou à la disponibilité du service (accès non autorisé, surcharge).</li>
      </ul>
    ),
  },
  {
    title: 'Contenu généré par IA',
    hint: "limites des quiz générés (peuvent contenir des erreurs), responsabilité de l'utilisateur.",
    content: (
      <p>
        Les quiz sont générés automatiquement par un modèle d'IA et{' '}
        <strong>peuvent contenir des erreurs ou approximations</strong>. Ils constituent une aide à la
        révision et ne sauraient se substituer aux supports de cours officiels. L'utilisateur reste
        responsable de la vérification des réponses.
      </p>
    ),
  },
  {
    title: 'Responsabilité',
    hint: "limites de responsabilité de l'éditeur.",
    content: (
      <p>
        Le service étant fourni dans un cadre pédagogique et « en l'état », la responsabilité de
        l'éditeur ne saurait être engagée pour les erreurs des contenus générés, une indisponibilité,
        ou une perte de données.
      </p>
    ),
  },
  {
    title: 'Propriété intellectuelle',
    hint: "droits sur le service et sur les contenus déposés par l'utilisateur.",
    content: (
      <p>
        Le code et l'interface d'EduTutor IA appartiennent à l'Équipe 05. Les{' '}
        <strong>contenus importés restent la propriété de l'utilisateur</strong>, qui garantit
        disposer des droits nécessaires sur les documents qu'il dépose.
      </p>
    ),
  },
  {
    title: 'Modification des CGU',
    hint: 'comment et quand les CGU peuvent évoluer.',
    content: (
      <p>
        Les CGU peuvent évoluer avec le service. La version applicable est celle publiée sur cette
        page ; la date de dernière mise à jour figure en pied de page.
      </p>
    ),
  },
  {
    title: 'Droit applicable et litiges',
    hint: 'droit applicable et juridiction compétente.',
    content: (
      <p>
        Les présentes CGU sont soumises au <strong>droit français</strong>. Tout litige relève, à
        défaut de résolution amiable, des juridictions françaises compétentes.
      </p>
    ),
  },
];

export default function CGUPage() {
  return (
    <LegalScaffold
      title="Conditions Générales d'Utilisation"
      intro="Les règles d'utilisation du service EduTutor IA, acceptées par chaque utilisateur."
      sections={SECTIONS}
      complete
      lastUpdated="01/07/2026"
    />
  );
}
