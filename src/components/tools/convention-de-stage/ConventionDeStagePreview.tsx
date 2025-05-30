"use client";

import { forwardRef } from "react";
import { ConventionDeStage } from "./types";

interface ConventionDeStagePreviewProps {
  conventionDeStage: ConventionDeStage;
}

export const ConventionDeStagePreview = forwardRef<HTMLDivElement, ConventionDeStagePreviewProps>(
  ({ conventionDeStage }, ref) => {
    const {
      reference,
      date,
      studentInfo,
      companyInfo,
      companySupervisor,
      internshipInfo,
      educationalInfo,
      additionalClauses,
      signatures
    } = conventionDeStage;

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(date);
    };

    return (
      <div ref={ref} className="bg-white w-[210mm] mx-auto shadow-sm">
        {/* Header Section */}
        <div className="convention-section p-8 border-b">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">CONVENTION DE STAGE</h1>
              <p className="text-gray-600">Référence: {reference}</p>
              <p className="text-gray-600">Date: {formatDate(date)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{companyInfo.name}</p>
              <p>{companyInfo.address}</p>
              <p>{companyInfo.postalCode} {companyInfo.city}</p>
              <p>{companyInfo.country}</p>
              <p>SIRET: {companyInfo.siret}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ENTRE LES SOUSSIGNÉS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">L&apos;ENTREPRISE D&apos;ACCUEIL</h3>
                <p className="font-medium">{companyInfo.name}</p>
                <p>{companyInfo.address}</p>
                <p>{companyInfo.postalCode} {companyInfo.city}</p>
                <p>{companyInfo.country}</p>
                <p className="mt-2">Représentée par :</p>
                <p>{companyInfo.representative.firstName} {companyInfo.representative.lastName}</p>
                <p>En qualité de : {companyInfo.representative.title}</p>
                <p>Email : {companyInfo.representative.email}</p>
                <p>Téléphone : {companyInfo.representative.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">L&apos;ÉTABLISSEMENT D&apos;ENSEIGNEMENT</h3>
                <p className="font-medium">{educationalInfo.institution.name}</p>
                <p>{educationalInfo.institution.address}</p>
                <p>{educationalInfo.institution.postalCode} {educationalInfo.institution.city}</p>
                <p>{educationalInfo.institution.country}</p>
                <p className="mt-2">Représenté par :</p>
                <p>{educationalInfo.institution.representative.firstName} {educationalInfo.institution.representative.lastName}</p>
                <p>En qualité de : {educationalInfo.institution.representative.title}</p>
                <p>Email : {educationalInfo.institution.representative.email}</p>
                <p>Téléphone : {educationalInfo.institution.representative.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">LE STAGIAIRE</h3>
                <p className="font-medium">{studentInfo.firstName} {studentInfo.lastName}</p>
                <p>Né(e) le {formatDate(studentInfo.dateOfBirth)} à {studentInfo.placeOfBirth}</p>
                <p>Nationalité : {studentInfo.nationality}</p>
                <p>{studentInfo.address}</p>
                <p>{studentInfo.postalCode} {studentInfo.city}</p>
                <p className="mt-2">Email : {studentInfo.email}</p>
                <p>Téléphone : {studentInfo.phone}</p>
                <p className="mt-2">Formation suivie : {educationalInfo.program}</p>
                <p>Niveau d&apos;études : {studentInfo.studyLevel}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 1 : OBJET DE LA CONVENTION</h2>
            <p>
              La présente convention règle les rapports entre l&apos;entreprise d&apos;accueil, l&apos;établissement d&apos;enseignement et le stagiaire.
            </p>
            <p className="mt-2">
              Elle a pour objet de préciser les conditions dans lesquelles le stagiaire sera accueilli au sein de l&apos;entreprise pour effectuer un stage dans le cadre de sa formation.
            </p>
          </div>
        </div>

        {/* Internship Details Section */}
        <div className="convention-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 2 : DURÉE ET DATES DU STAGE</h2>
            <p>
              <span className="font-medium">Dates du stage :</span> du {formatDate(internshipInfo.startDate)} au {formatDate(internshipInfo.endDate)}
            </p>
            <p>
              <span className="font-medium">Durée totale :</span> {internshipInfo.duration}
            </p>
            <p>
              <span className="font-medium">Horaires de présence :</span> {internshipInfo.hoursPerWeek} heures par semaine
            </p>
            <p>
              <span className="font-medium">Répartition hebdomadaire :</span> {internshipInfo.schedule}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 3 : LIEU DU STAGE</h2>
            <p>
              <span className="font-medium">Lieu du stage :</span> {internshipInfo.location}
            </p>
            <p>
              <span className="font-medium">Service d&apos;affectation :</span> {internshipInfo.department}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 4 : SUJET DU STAGE</h2>
            <p>
              <span className="font-medium">Sujet :</span> {internshipInfo.subject}
            </p>
            <p className="mt-2">
              <span className="font-medium">Description :</span> {internshipInfo.description}
            </p>
            <p className="mt-2">
              <span className="font-medium">Activités confiées :</span> {internshipInfo.tasks}
            </p>
            <p className="mt-2">
              <span className="font-medium">Compétences à acquérir ou à développer :</span> {internshipInfo.skills}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 5 : ENCADREMENT DU STAGIAIRE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">TUTEUR DANS L&apos;ENTREPRISE</h3>
                <p>{companySupervisor.firstName} {companySupervisor.lastName}</p>
                <p>Fonction : {companySupervisor.title}</p>
                <p>Email : {companySupervisor.email}</p>
                <p>Téléphone : {companySupervisor.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">ENSEIGNANT RÉFÉRENT</h3>
                <p>{educationalInfo.supervisor.firstName} {educationalInfo.supervisor.lastName}</p>
                <p>Fonction : {educationalInfo.supervisor.title}</p>
                <p>Email : {educationalInfo.supervisor.email}</p>
                <p>Téléphone : {educationalInfo.supervisor.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compensation and Conditions Section */}
        <div className="convention-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 6 : GRATIFICATION ET AVANTAGES</h2>
            <p>
              <span className="font-medium">Montant de la gratification :</span> {internshipInfo.compensation.amount} €{" "}
              {internshipInfo.compensation.frequency === "hourly" ? "par heure" :
               internshipInfo.compensation.frequency === "daily" ? "par jour" :
               internshipInfo.compensation.frequency === "weekly" ? "par semaine" : "par mois"}
            </p>
            <p className="mt-2">
              <span className="font-medium">Avantages offerts :</span> {internshipInfo.compensation.benefits || "Aucun"}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 7 : PROTECTION SOCIALE</h2>
            <p>
              Pendant la durée du stage, le stagiaire reste affilié à son régime de sécurité sociale antérieur.
            </p>
            <p className="mt-2">
              Les stages effectués à l&apos;étranger sont signalés préalablement au départ du stagiaire à la Sécurité Sociale.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 8 : DISCIPLINE</h2>
            <p>
              Durant son stage, le stagiaire est soumis à la discipline et au règlement intérieur de l&apos;entreprise, notamment en ce qui concerne les horaires, les règles d&apos;hygiène et de sécurité.
            </p>
            <p className="mt-2">
              Toute sanction disciplinaire ne peut être décidée que par l&apos;établissement d&apos;enseignement. L&apos;entreprise informe l&apos;établissement des manquements et lui fournit les éléments permettant d&apos;envisager une sanction.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 9 : CONGÉS ET ABSENCES</h2>
            <p>
              {internshipInfo.holidays}
            </p>
            <p className="mt-2">
              Toute absence doit être signalée par le stagiaire à l&apos;entreprise et à l&apos;établissement d&apos;enseignement.
            </p>
          </div>
        </div>

        {/* Education and Evaluation Section */}
        <div className="convention-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 10 : OBJECTIFS PÉDAGOGIQUES</h2>
            <p>
              {educationalInfo.objectives}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 11 : ÉVALUATION DU STAGE</h2>
            <p>
              {educationalInfo.evaluation}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 12 : CONFIDENTIALITÉ</h2>
            <p>
              Le stagiaire s&apos;engage à ne pas divulguer les informations recueillies par lui, sauf accord de l&apos;entreprise. Cette obligation de confidentialité reste en vigueur après la fin du stage.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 13 : FIN DE STAGE</h2>
            <p>
              En cas de manquement à la discipline, l&apos;entreprise se réserve le droit de mettre fin au stage après en avoir informé le responsable de l&apos;établissement d&apos;enseignement.
            </p>
            <p className="mt-2">
              En cas de difficultés dans le déroulement du stage, le stagiaire, l&apos;entreprise ou l&apos;établissement d&apos;enseignement peuvent mettre fin au stage de façon anticipée, à condition d&apos;en informer les autres parties et de respecter un préavis.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 14 : CLAUSES PARTICULIÈRES</h2>
            <p>
              {additionalClauses}
            </p>
          </div>
        </div>

        {/* Signatures Section */}
        <div className="convention-section p-8">
          <h2 className="text-lg font-semibold mb-6 border-b pb-1">SIGNATURES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border-t pt-4">
              <p className="font-semibold">Pour l&apos;entreprise d&apos;accueil</p>
              <p>{companyInfo.representative.firstName} {companyInfo.representative.lastName}</p>
              <p>{companyInfo.representative.title}</p>
              <div className="h-16 mt-4 border-b border-dashed"></div>
              <p className="text-sm text-gray-500 mt-1">Signature et cachet</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="font-semibold">Pour l&apos;établissement d&apos;enseignement</p>
              <p>{educationalInfo.institution.representative.firstName} {educationalInfo.institution.representative.lastName}</p>
              <p>{educationalInfo.institution.representative.title}</p>
              <div className="h-16 mt-4 border-b border-dashed"></div>
              <p className="text-sm text-gray-500 mt-1">Signature et cachet</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="font-semibold">Le stagiaire</p>
              <p>{studentInfo.firstName} {studentInfo.lastName}</p>
              <div className="h-16 mt-4 border-b border-dashed"></div>
              <p className="text-sm text-gray-500 mt-1">Signature</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>Fait à _________________, le {formatDate(signatures.date)}, en trois exemplaires.</p>
          </div>
        </div>
      </div>
    );
  }
);

ConventionDeStagePreview.displayName = "ConventionDeStagePreview";

export default ConventionDeStagePreview;
