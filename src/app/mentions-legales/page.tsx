"use client";

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 text-white">Mentions légales</h1>
      <p className="text-muted-foreground mb-8">Dernière mise à jour : 01/09/2024</p>

      <div className="space-y-6 text-sm md:text-base text-gray-300">
        <p>
          Bienvenue sur la page des mentions légales de Pledge and Grow. Nous nous engageons à la transparence et au respect des réglementations. Cette section présente notre structure légale, nos pratiques, et les conditions générales d’utilisation de notre site. L’utilisation de nos services implique l’acceptation de ces termes.
        </p>

        <section>
          <h2 className="font-semibold text-white mb-1">1. Identification de l'éditeur et de l'hébergeur du site</h2>
          <p><strong>Éditeur et Propriétaire :</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>Raison sociale : PLEDGE AND GROW</li>
            <li>Siège Social : 4Bis Rue Alfred Nobel – Champs-sur-Marne – France</li>
            <li>SIREN : 931577662</li>
            <li>N° TVA Intracommunautaire : FR38931577662</li>
            <li>Code NAF : 62.01Z - Programmation informatique</li>
            <li>Téléphone : +33 7 53 69 58 40</li>
            <li>Site Web : pledgeandgrow.com</li>
            <li>Mail : contact@pledgeandgrow.com</li>
          </ul>

          <p className="mt-4"><strong>Hébergeur :</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>Vercel Inc</li>
            <li>440 N Barranca Ave #4133, Covina, CA 91723</li>
            <li>Mail : privacy@vercel.com</li>
          </ul>

          <p className="mt-2">
            Pour les utilisateurs de l’EEE, du Royaume-Uni et de Californie, Vercel peut collecter vos données personnelles en tant que « contrôleur de données » lorsqu'il détermine les moyens et objectifs du traitement (ex. : données des visiteurs, participants à des événements, ou clients).
          </p>
          <p className="mt-2">
            En tant que « processeur de données » ou « fournisseur de services », Vercel traite les données pour le compte de ses clients qui utilisent ses services d'hébergement ou ses outils d'analyse. Plus d’informations sont disponibles sur : <a href="https://vercel.com" className="underline text-blue-400" target="_blank">vercel.com</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-white mb-1">2. Accès au site</h2>
          <p>
            Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découler d’une nécessité de maintenance.
          </p>
          <p className="mt-2">
            En cas de modification, interruption ou suspension des services le site pledgeandgrow.com ne saurait être tenu responsable.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-white mb-1">3. Collecte de données</h2>
          <p>
            L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.
          </p>
          <p className="mt-2">
            En naviguant sur le site, il choisit de les accepter ou non. Un cookie est un élément qui ne permet pas d’identifier l’Utilisateur mais sert à enregistrer des informations relatives à la navigation de celui-ci sur le site Internet.
          </p>
          <p className="mt-2">
            L’Utilisateur pourra désactiver ce cookie par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.
          </p>
        </section>
      </div>
    </div>
  );
}
