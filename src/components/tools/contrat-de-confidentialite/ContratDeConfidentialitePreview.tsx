"use client";

import { forwardRef } from "react";
import { ContratDeConfidentialite } from "./types";

interface ContratDeConfidentialitePreviewProps {
  contratDeConfidentialite: ContratDeConfidentialite;
}

export const ContratDeConfidentialitePreview = forwardRef<HTMLDivElement, ContratDeConfidentialitePreviewProps>(
  ({ contratDeConfidentialite }, ref) => {
    const {
      reference,
      date,
      disclosingParty,
      receivingParty,
      reciprocal,
      scope,
      obligations,
      legalTerms
    } = contratDeConfidentialite;

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
        <div className="nda-section p-8 border-b">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-1">ACCORD DE CONFIDENTIALITÉ</h1>
              <p className="text-gray-600">Référence: {reference}</p>
              <p className="text-gray-600">Date: {formatDate(date)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{disclosingParty.name}</p>
              <p>{disclosingParty.address}</p>
              <p>{disclosingParty.postalCode} {disclosingParty.city}</p>
              <p>{disclosingParty.country}</p>
              {disclosingParty.siret && <p>SIRET: {disclosingParty.siret}</p>}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ENTRE LES SOUSSIGNÉS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{reciprocal ? "PARTIE 1" : "LA PARTIE DIVULGATRICE"}</h3>
                <p className="font-medium">{disclosingParty.name}</p>
                <p>{disclosingParty.address}</p>
                <p>{disclosingParty.postalCode} {disclosingParty.city}</p>
                <p>{disclosingParty.country}</p>
                {disclosingParty.type === "company" && (
                  <>
                    {disclosingParty.siret && <p className="mt-2">SIRET : {disclosingParty.siret}</p>}
                    <p className="mt-2">Représentée par : {disclosingParty.representative}</p>
                    <p>En qualité de : {disclosingParty.representativeTitle}</p>
                  </>
                )}
                <p className="mt-2">Email : {disclosingParty.email}</p>
                <p>Téléphone : {disclosingParty.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{reciprocal ? "PARTIE 2" : "LA PARTIE RÉCEPTRICE"}</h3>
                <p className="font-medium">{receivingParty.name}</p>
                <p>{receivingParty.address}</p>
                <p>{receivingParty.postalCode} {receivingParty.city}</p>
                <p>{receivingParty.country}</p>
                {receivingParty.type === "company" && (
                  <>
                    {receivingParty.siret && <p className="mt-2">SIRET : {receivingParty.siret}</p>}
                    <p className="mt-2">Représentée par : {receivingParty.representative}</p>
                    <p>En qualité de : {receivingParty.representativeTitle}</p>
                  </>
                )}
                <p className="mt-2">Email : {receivingParty.email}</p>
                <p>Téléphone : {receivingParty.phone}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="italic">
              Ci-après dénommés collectivement « les Parties » ou individuellement « la Partie »
            </p>
            <p className="mt-4">
              Il a été convenu et arrêté ce qui suit :
            </p>
          </div>
        </div>

        {/* Scope Section */}
        <div className="nda-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 1 : OBJET DE L&apos;ACCORD</h2>
            <p>
              Le présent accord a pour objet de définir les conditions dans lesquelles les Parties s&apos;engagent à préserver la confidentialité des informations qui leur seront communiquées dans le cadre de : {scope.purpose}.
            </p>
            <p className="mt-2">
              {reciprocal 
                ? "Les Parties s&apos;engagent réciproquement à considérer comme confidentielles toutes les informations qu&apos;elles pourront être amenées à se communiquer dans le cadre de l&apos;objet défini ci-dessus." 
                : "La Partie Réceptrice s&apos;engage à considérer comme confidentielles toutes les informations qui lui seront communiquées par la Partie Divulgatrice dans le cadre de l&apos;objet défini ci-dessus."}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 2 : DÉFINITION DES INFORMATIONS CONFIDENTIELLES</h2>
            <p>
              {scope.confidentialInfoDescription}
            </p>
            <p className="mt-4 font-semibold">Ne sont pas considérées comme des Informations Confidentielles :</p>
            <p className="mt-2">
              {scope.excludedInfo}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 3 : OBLIGATIONS DE CONFIDENTIALITÉ</h2>
            
            <h3 className="font-semibold mt-4 mb-2">3.1 Restrictions de divulgation</h3>
            <p>{obligations.disclosureRestrictions}</p>
            
            <h3 className="font-semibold mt-4 mb-2">3.2 Mesures de protection</h3>
            <p>{obligations.protectionMeasures}</p>
            
            <h3 className="font-semibold mt-4 mb-2">3.3 Restitution des informations</h3>
            <p>{obligations.returnOfInfo}</p>
            
            <h3 className="font-semibold mt-4 mb-2">3.4 Notification</h3>
            <p>{obligations.notificationRequirements}</p>
          </div>
        </div>

        {/* Legal Terms Section */}
        <div className="nda-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 4 : DURÉE DE L&apos;ACCORD</h2>
            <p>
              Le présent accord entre en vigueur à la date de sa signature par les Parties, soit le {formatDate(scope.startDate)}.
            </p>
            <p className="mt-2">
              Les obligations de confidentialité prévues par le présent accord resteront en vigueur pendant une durée de {scope.duration.value} {scope.duration.unit === "years" ? "ans" : "mois"} à compter de la date de signature.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 5 : PORTÉE TERRITORIALE</h2>
            <p>
              Les obligations de confidentialité prévues par le présent accord s&apos;appliquent dans les territoires suivants : {scope.territorialScope}.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 6 : SANCTIONS</h2>
            <p>
              {legalTerms.penalties}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 7 : FORCE MAJEURE</h2>
            <p>
              {legalTerms.forceMajeure}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 8 : INTÉGRALITÉ DE L&apos;ACCORD</h2>
            <p>
              {legalTerms.entireAgreement}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 9 : MODIFICATIONS</h2>
            <p>
              {legalTerms.amendments}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 10 : DIVISIBILITÉ</h2>
            <p>
              {legalTerms.severability}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 11 : DROIT APPLICABLE ET JURIDICTION COMPÉTENTE</h2>
            <p>
              {legalTerms.applicableLaw}
            </p>
            <p className="mt-2">
              {legalTerms.disputeResolution}
            </p>
          </div>

          {legalTerms.additionalClauses && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 12 : CLAUSES PARTICULIÈRES</h2>
              <p>
                {legalTerms.additionalClauses}
              </p>
            </div>
          )}
        </div>

        {/* Signatures Section */}
        <div className="nda-section p-8">
          <h2 className="text-lg font-semibold mb-6 border-b pb-1">SIGNATURES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-t pt-4">
              <p className="font-semibold">{reciprocal ? "Pour la Partie 1" : "Pour la Partie Divulgatrice"}</p>
              <p>{disclosingParty.type === "company" ? disclosingParty.representative : disclosingParty.name}</p>
              {disclosingParty.type === "company" && <p>{disclosingParty.representativeTitle}</p>}
              <div className="h-16 mt-4 border-b border-dashed"></div>
              <p className="text-sm text-gray-500 mt-1">Signature et cachet</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="font-semibold">{reciprocal ? "Pour la Partie 2" : "Pour la Partie Réceptrice"}</p>
              <p>{receivingParty.type === "company" ? receivingParty.representative : receivingParty.name}</p>
              {receivingParty.type === "company" && <p>{receivingParty.representativeTitle}</p>}
              <div className="h-16 mt-4 border-b border-dashed"></div>
              <p className="text-sm text-gray-500 mt-1">Signature et cachet</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>Fait à _________________, le {formatDate(date)}, en deux exemplaires originaux.</p>
          </div>
        </div>
      </div>
    );
  }
);

ContratDeConfidentialitePreview.displayName = "ContratDeConfidentialitePreview";

export default ContratDeConfidentialitePreview;
