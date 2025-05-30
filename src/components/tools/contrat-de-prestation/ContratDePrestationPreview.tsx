"use client";

import { forwardRef } from "react";
import { ContratDePrestation } from "./types";

interface ContratDePrestationPreviewProps {
  contratDePrestation: ContratDePrestation;
}

export const ContratDePrestationPreview = forwardRef<HTMLDivElement, ContratDePrestationPreviewProps>(
  ({ contratDePrestation }, ref) => {
    const {
      clientInfo,
      providerInfo,
      serviceItems,
      paymentConditions,
      contractDuration,
      contractInfo,
      totalHT,
      totalTVA,
      totalTTC
    } = contratDePrestation;

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(date);
    };

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(amount);
    };

    return (
      <div ref={ref} className="bg-white w-[210mm] mx-auto shadow-sm">
        {/* Header Section */}
        <div className="contract-section p-8 border-b">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-1">{contractInfo.title.toUpperCase()}</h1>
              <p className="text-gray-600">Référence: {contractInfo.reference}</p>
              <p className="text-gray-600">Date: {formatDate(contractInfo.date)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{providerInfo.name}</p>
              <p>{providerInfo.address}</p>
              <p>{providerInfo.postalCode} {providerInfo.city}</p>
              <p>{providerInfo.country}</p>
              <p>SIRET: {providerInfo.siret}</p>
              <p>TVA: {providerInfo.tvaNumber}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ENTRE LES SOUSSIGNÉS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">LE PRESTATAIRE</h3>
                <p className="font-medium">{providerInfo.name}</p>
                <p>{providerInfo.address}</p>
                <p>{providerInfo.postalCode} {providerInfo.city}</p>
                <p>{providerInfo.country}</p>
                <p className="mt-2">SIRET : {providerInfo.siret}</p>
                <p>Code APE : {providerInfo.activityCode}</p>
                <p>N° TVA : {providerInfo.tvaNumber}</p>
                <p className="mt-2">Représenté par : {providerInfo.representativeName}</p>
                <p>En qualité de : {providerInfo.representativeTitle}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">LE CLIENT</h3>
                <p className="font-medium">{clientInfo.name}</p>
                <p>{clientInfo.address}</p>
                <p>{clientInfo.postalCode} {clientInfo.city}</p>
                <p>{clientInfo.country}</p>
                {clientInfo.type === "company" && (
                  <>
                    <p className="mt-2">SIRET : {clientInfo.siret}</p>
                    <p>N° TVA : {clientInfo.tvaNumber}</p>
                    <p className="mt-2">Représenté par : {clientInfo.contactPerson}</p>
                  </>
                )}
                <p className="mt-2">Email : {clientInfo.email}</p>
                <p>Téléphone : {clientInfo.phone}</p>
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

        {/* Contract Details Section */}
        <div className="contract-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 1 : OBJET DU CONTRAT</h2>
            <p>{contractInfo.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 2 : DESCRIPTION DES PRESTATIONS</h2>
            <p>{contractInfo.scope}</p>
            
            <h3 className="font-semibold mt-4 mb-2">Livrables</h3>
            <p>{contractInfo.deliverables}</p>
            
            <h3 className="font-semibold mt-4 mb-2">Calendrier prévisionnel</h3>
            <p>{contractInfo.timeline}</p>
            
            <h3 className="font-semibold mt-4 mb-2">Lieu d&apos;exécution</h3>
            <p>{contractInfo.location}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 3 : DURÉE DU CONTRAT</h2>
            <p>
              <span className="font-medium">Type de contrat : </span>
              {contractDuration.type === "fixed" ? "Contrat à durée déterminée" :
               contractDuration.type === "indefinite" ? "Contrat à durée indéterminée" :
               "Contrat de projet"}
            </p>
            <p>
              <span className="font-medium">Date de début : </span>
              {formatDate(contractDuration.startDate)}
            </p>
            {contractDuration.endDate && (
              <p>
                <span className="font-medium">Date de fin : </span>
                {formatDate(contractDuration.endDate)}
              </p>
            )}
            {contractDuration.renewalTerms && (
              <p className="mt-2">
                <span className="font-medium">Conditions de renouvellement : </span>
                {contractDuration.renewalTerms}
              </p>
            )}
            <p className="mt-2">
              <span className="font-medium">Conditions de résiliation : </span>
              {contractDuration.terminationNotice}
            </p>
          </div>
        </div>

        {/* Services and Payment Section */}
        <div className="contract-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 4 : PRIX ET MODALITÉS DE PAIEMENT</h2>
            
            <h3 className="font-semibold mt-4 mb-2">Détail des prestations</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Description</th>
                    <th className="border p-2 text-right">Quantité</th>
                    <th className="border p-2 text-right">Prix unitaire HT</th>
                    <th className="border p-2 text-right">TVA (%)</th>
                    <th className="border p-2 text-right">Total HT</th>
                    <th className="border p-2 text-right">Total TTC</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border p-2">{item.description}</td>
                      <td className="border p-2 text-right">{item.quantity}</td>
                      <td className="border p-2 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="border p-2 text-right">{item.tvaRate}%</td>
                      <td className="border p-2 text-right">{formatCurrency(item.totalHT)}</td>
                      <td className="border p-2 text-right">{formatCurrency(item.totalTTC)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td colSpan={4} className="border p-2 text-right font-semibold">Total HT</td>
                    <td className="border p-2 text-right font-semibold">{formatCurrency(totalHT)}</td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td colSpan={4} className="border p-2 text-right font-semibold">Total TVA</td>
                    <td className="border p-2 text-right font-semibold">{formatCurrency(totalTVA)}</td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td colSpan={4} className="border p-2 text-right font-semibold">Total TTC</td>
                    <td colSpan={2} className="border p-2 text-right font-semibold">{formatCurrency(totalTTC)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <h3 className="font-semibold mt-6 mb-2">Conditions de paiement</h3>
            <p>
              <span className="font-medium">Mode de paiement : </span>
              {paymentConditions.method === "virement" ? "Virement bancaire" :
               paymentConditions.method === "chèque" ? "Chèque" :
               paymentConditions.method === "espèces" ? "Espèces" :
               paymentConditions.method === "carte" ? "Carte bancaire" :
               paymentConditions.method === "prélèvement" ? "Prélèvement automatique" : "Autre"}
            </p>
            <p>
              <span className="font-medium">Conditions : </span>
              {paymentConditions.terms}
            </p>
            <p>
              <span className="font-medium">Délai de paiement : </span>
              {paymentConditions.deadlineInDays} jours
            </p>
            
            {paymentConditions.advancePayment && (
              <p>
                <span className="font-medium">Acompte : </span>
                {paymentConditions.advancePayment.percentage}% ({formatCurrency(paymentConditions.advancePayment.amount)})
              </p>
            )}
            
            <p className="mt-2">
              <span className="font-medium">Pénalités de retard : </span>
              {paymentConditions.penalties}
            </p>
            
            <h3 className="font-semibold mt-6 mb-2">Coordonnées bancaires du Prestataire</h3>
            <p>
              <span className="font-medium">Banque : </span>
              {providerInfo.bankDetails.bankName}
            </p>
            <p>
              <span className="font-medium">IBAN : </span>
              {providerInfo.bankDetails.iban}
            </p>
            <p>
              <span className="font-medium">BIC : </span>
              {providerInfo.bankDetails.bic}
            </p>
          </div>
        </div>

        {/* Legal Clauses Section */}
        <div className="contract-section p-8 border-b">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 5 : CONFIDENTIALITÉ</h2>
            <p>{contractInfo.confidentiality}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 6 : PROPRIÉTÉ INTELLECTUELLE</h2>
            <p>{contractInfo.intellectualProperty}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 7 : GARANTIES</h2>
            <p>{contractInfo.warranties}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 8 : RESPONSABILITÉS</h2>
            <p>{contractInfo.liabilities}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 9 : FORCE MAJEURE</h2>
            <p>{contractInfo.forceMajeure}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 10 : RÈGLEMENT DES LITIGES</h2>
            <p>{contractInfo.disputeResolution}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 11 : DROIT APPLICABLE</h2>
            <p>{contractInfo.applicableLaw}</p>
          </div>

          {contractInfo.additionalClauses && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 border-b pb-1">ARTICLE 12 : CLAUSES PARTICULIÈRES</h2>
              <p>{contractInfo.additionalClauses}</p>
            </div>
          )}
        </div>

        {/* Signatures Section */}
        <div className="contract-section p-8">
          <h2 className="text-lg font-semibold mb-6 border-b pb-1">SIGNATURES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-t pt-4">
              <p className="font-semibold">Pour le Prestataire</p>
              <p>{providerInfo.representativeName}</p>
              <p>{providerInfo.representativeTitle}</p>
              <div className="h-16 mt-4 border-b border-dashed"></div>
              <p className="text-sm text-gray-500 mt-1">Signature et cachet</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="font-semibold">Pour le Client</p>
              <p>{clientInfo.type === "company" ? clientInfo.contactPerson : clientInfo.name}</p>
              <div className="h-16 mt-4 border-b border-dashed"></div>
              <p className="text-sm text-gray-500 mt-1">Signature et cachet</p>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>Fait à _________________, le _________________, en deux exemplaires originaux.</p>
          </div>
        </div>
      </div>
    );
  }
);

ContratDePrestationPreview.displayName = "ContratDePrestationPreview";

export default ContratDePrestationPreview;
