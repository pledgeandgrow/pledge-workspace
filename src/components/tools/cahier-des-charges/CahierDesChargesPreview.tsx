import React, { forwardRef } from "react";
import { BudgetItem, CahierDesCharges, PaymentMilestone } from "./types";

interface CahierDesChargesPreviewProps {
  cahierDesCharges: CahierDesCharges;
}

const CahierDesChargesPreviewComponent = forwardRef<
  HTMLDivElement,
  CahierDesChargesPreviewProps
>(({ cahierDesCharges }, ref) => {
  // Alias cahierDesCharges as data for easier reference in the component
  const data = cahierDesCharges;
  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      // eslint-disable-line @typescript-eslint/no-unused-vars
      return dateString;
    }
  };

  return (
    <div
      ref={ref}
      className="bg-white text-black p-8 max-w-4xl mx-auto shadow-lg"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.projectInfo.title}</h1>
        <p className="text-xl mb-4">Référence: {data.projectInfo.reference}</p>
        <div className="flex justify-between text-sm">
          <p>Date: {formatDate(data.projectInfo.date)}</p>
          <p>Version: {data.projectInfo.version}</p>
          <p>
            Statut:{" "}
            {data.projectInfo.status === "draft"
              ? "Brouillon"
              : data.projectInfo.status === "review"
              ? "En revue"
              : data.projectInfo.status === "approved"
              ? "Approuvé"
              : "Terminé"}
          </p>
        </div>
      </div>

      {/* Project Summary */}
      <div className="mb-8 cdc-section ">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
          Résumé du Projet
        </h2>
        <p className="whitespace-pre-line">{data.projectInfo.summary}</p>
      </div>

      {/* Client and Company Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 cdc-section ">
        <div>
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Client
          </h2>
          <p>
            <strong>Nom:</strong> {data.clientInfo.name}
          </p>
          <p>
            <strong>Contact:</strong> {data.clientInfo.contactPerson}
          </p>
          <p>
            <strong>Email:</strong> {data.clientInfo.email}
          </p>
          <p>
            <strong>Téléphone:</strong> {data.clientInfo.phone}
          </p>
          <p>
            <strong>Adresse:</strong> {data.clientInfo.address}
          </p>
          {data.clientInfo.website && (
            <p>
              <strong>Site Web:</strong> {data.clientInfo.website}
            </p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Prestataire
          </h2>
          <p>
            <strong>Nom:</strong> {data.companyInfo.name}
          </p>
          <p>
            <strong>Contact:</strong> {data.companyInfo.contactName}
          </p>
          <p>
            <strong>Adresse:</strong> {data.companyInfo.address}
          </p>
          <p>
            <strong>Code postal et ville:</strong> {data.companyInfo.zipCity}
          </p>
          <p>
            <strong>Pays:</strong> {data.companyInfo.country}
          </p>
          <p>
            <strong>N° d&apos;entreprise:</strong>{" "}
            {data.companyInfo.companyNumber}
          </p>
          <p>
            <strong>N° TVA:</strong> {data.companyInfo.vatNumber}
          </p>
          <p>
            <strong>Email:</strong> {data.companyInfo.email}
          </p>
          <p>
            <strong>Téléphone:</strong> {data.companyInfo.phone}
          </p>
        </div>
      </div>

      {/* Team Members */}
      {data.teamMembers.length > 0 && (
        <div className="mb-8 cdc-section ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Équipe Projet
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.teamMembers.map((member) => (
              <div key={member.id} className="border p-4 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-bold">{member.name}</h3>
                  <span className="text-gray-600">{member.role}</span>
                </div>
                <p>
                  <strong>Email:</strong> {member.email}
                </p>
                {member.phone && (
                  <p>
                    <strong>Téléphone:</strong> {member.phone}
                  </p>
                )}
                <p>
                  <strong>Responsabilités:</strong> {member.responsibilities}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Objectives */}
      {data.objectives.length > 0 && (
        <div className="mb-8 cdc-section ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Objectifs du Projet
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.objectives.map((objective) => (
              <div key={objective.id} className="border p-4 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-bold">{objective.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      objective.priority === "high"
                        ? "bg-red-500"
                        : objective.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {objective.priority === "high"
                      ? "Priorité haute"
                      : objective.priority === "medium"
                      ? "Priorité moyenne"
                      : "Priorité basse"}
                  </span>
                </div>
                <p className="mt-2">{objective.description}</p>
                {objective.measurableOutcome && (
                  <p className="mt-2">
                    <strong>Résultat mesurable:</strong>{" "}
                    {objective.measurableOutcome}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Scope */}
      <div className="mb-8 cdc-section ">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
          Périmètre du Projet
        </h2>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Inclus dans le périmètre</h3>
          <p className="whitespace-pre-line">{data.scope.inScope}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Hors périmètre</h3>
          <p className="whitespace-pre-line">{data.scope.outOfScope}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Hypothèses</h3>
          <p className="whitespace-pre-line">{data.scope.assumptions}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Contraintes</h3>
          <p className="whitespace-pre-line">{data.scope.constraints}</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Dépendances</h3>
          <p className="whitespace-pre-line">{data.scope.dependencies}</p>
        </div>
      </div>

      {/* Deliverables */}
      {data.deliverables.length > 0 && (
        <div className="mb-8 cdc-section ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Livrables
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="border p-4 rounded-md">
                <h3 className="font-bold">{deliverable.title}</h3>
                <p className="mt-2">{deliverable.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <p>
                    <strong>Format:</strong> {deliverable.format}
                  </p>
                  <p>
                    <strong>Date d&apos;échéance:</strong>{" "}
                    {formatDate(deliverable.dueDate)}
                  </p>
                </div>
                <p className="mt-2">
                  <strong>Critères d&apos;acceptation:</strong>{" "}
                  {deliverable.acceptanceCriteria}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      {data.milestones.length > 0 && (
        <div className="mb-8 cdc-section  ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Jalons du Projet
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.milestones.map((milestone) => (
              <div key={milestone.id} className="border p-4 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-bold">{milestone.title}</h3>
                  <span>{formatDate(milestone.dueDate)}</span>
                </div>
                <p className="mt-2">{milestone.description}</p>
                {milestone.deliverables.length > 0 && (
                  <div className="mt-2">
                    <p>
                      <strong>Livrables associés:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      {milestone.deliverables.map((deliverable, index) => (
                        <li key={index}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Functional Requirements */}
      {data.functionalRequirements.length > 0 && (
        <div className="mb-8 cdc-section  ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Exigences Fonctionnelles
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.functionalRequirements.map((requirement) => (
              <div key={requirement.id} className="border p-4 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-bold">{requirement.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      requirement.priority === "critical"
                        ? "bg-red-600"
                        : requirement.priority === "high"
                        ? "bg-red-500"
                        : requirement.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {requirement.priority === "critical"
                      ? "Critique"
                      : requirement.priority === "high"
                      ? "Priorité haute"
                      : requirement.priority === "medium"
                      ? "Priorité moyenne"
                      : "Priorité basse"}
                  </span>
                </div>
                {requirement.category && (
                  <p className="text-sm text-gray-600 mt-1">
                    Catégorie: {requirement.category}
                  </p>
                )}
                <p className="mt-2">{requirement.description}</p>
                <p className="mt-2">
                  <strong>Critères d&apos;acceptation:</strong>{" "}
                  {requirement.acceptanceCriteria}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Requirements */}
      {data.technicalRequirements.length > 0 && (
        <div className="mb-8 cdc-section  ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Exigences Techniques
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.technicalRequirements.map((requirement) => (
              <div key={requirement.id} className="border p-4 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-bold">{requirement.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      requirement.priority === "critical"
                        ? "bg-red-600"
                        : requirement.priority === "high"
                        ? "bg-red-500"
                        : requirement.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {requirement.priority === "critical"
                      ? "Critique"
                      : requirement.priority === "high"
                      ? "Priorité haute"
                      : requirement.priority === "medium"
                      ? "Priorité moyenne"
                      : "Priorité basse"}
                  </span>
                </div>
                {requirement.category && (
                  <p className="text-sm text-gray-600 mt-1">
                    Catégorie: {requirement.category}
                  </p>
                )}
                <p className="mt-2">{requirement.description}</p>
                <p className="mt-2">
                  <strong>Implémentation:</strong> {requirement.implementation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quality Requirements */}
      {data.qualityRequirements.length > 0 && (
        <div className="mb-8 cdc-section  ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Exigences de Qualité
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.qualityRequirements.map((requirement) => (
              <div key={requirement.id} className="border p-4 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-bold">{requirement.title}</h3>
                  <span className="px-2 py-1 rounded text-white bg-blue-500">
                    {requirement.category === "performance"
                      ? "Performance"
                      : requirement.category === "security"
                      ? "Sécurité"
                      : requirement.category === "usability"
                      ? "Utilisabilité"
                      : requirement.category === "reliability"
                      ? "Fiabilité"
                      : requirement.category === "maintainability"
                      ? "Maintenabilité"
                      : "Autre"}
                  </span>
                </div>
                <p className="mt-2">{requirement.description}</p>
                <p className="mt-2">
                  <strong>Critères de mesure:</strong>{" "}
                  {requirement.measurementCriteria}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget */}
      <div className="mb-8 cdc-section  ">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
          Budget
        </h2>

        {data.budget.breakdown.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Éléments budgétaires</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Catégorie</th>
                  <th className="border p-2 text-right">Montant (€)</th>
                </tr>
              </thead>
              <tbody>
                {data.budget.breakdown.map((item: BudgetItem) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2">{item.category}</td>
                    <td className="border p-2 text-right">
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2" colSpan={2}>
                    Total
                  </td>
                  <td className="border p-2 text-right">
                    {data.budget.breakdown
                      .reduce(
                        (sum: number, item: BudgetItem) => sum + item.amount,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {data.budget.paymentSchedule.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-2">Échéancier de paiement</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Date</th>
                  <th className="border p-2 text-left">Conditions</th>
                  <th className="border p-2 text-right">Montant (€)</th>
                </tr>
              </thead>
              <tbody>
                {data.budget.paymentSchedule.map(
                  (milestone: PaymentMilestone) => (
                    <tr key={milestone.id}>
                      <td className="border p-2">{milestone.description}</td>
                      <td className="border p-2">
                        {formatDate(milestone.dueDate)}
                      </td>
                      <td className="border p-2">{milestone.conditions}</td>
                      <td className="border p-2 text-right">
                        {milestone.amount.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2" colSpan={3}>
                    Total
                  </td>
                  <td className="border p-2 text-right">
                    {data.budget.paymentSchedule
                      .reduce(
                        (sum: number, milestone: PaymentMilestone) =>
                          sum + milestone.amount,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {data.budget.notes && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Notes budgétaires</h3>
            <p className="whitespace-pre-line">{data.budget.notes}</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="mb-8 cdc-section  ">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
          Calendrier
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <p>
            <strong>Date de début:</strong>{" "}
            {formatDate(data.timeline.startDate)}
          </p>
          <p>
            <strong>Date de fin:</strong> {formatDate(data.timeline.endDate)}
          </p>
        </div>

        {data.timeline.phases.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Phases du projet</h3>
            <div className="grid grid-cols-1 gap-4">
              {data.timeline.phases.map((phase) => (
                <div key={phase.id} className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <h4 className="font-bold">{phase.title}</h4>
                    <span>
                      {formatDate(phase.startDate)} -{" "}
                      {formatDate(phase.endDate)}
                    </span>
                  </div>
                  <p className="mt-2">{phase.description}</p>
                  {phase.deliverables.length > 0 && (
                    <div className="mt-2">
                      <p>
                        <strong>Livrables:</strong>
                      </p>
                      <ul className="list-disc pl-5">
                        {phase.deliverables.map((deliverable, index) => (
                          <li key={index}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.timeline.notes && (
          <div>
            <h3 className="text-xl font-bold mb-2">Notes sur le calendrier</h3>
            <p className="whitespace-pre-line">{data.timeline.notes}</p>
          </div>
        )}
      </div>

      {/* Risks and Mitigations */}
      {data.risks.length > 0 && (
        <div className="mb-8 cdc-section  ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Risques et Mitigations
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.risks.map((risk) => (
              <div key={risk.id} className="border p-4 rounded-md">
                <div className="flex justify-between">
                  <h3 className="font-bold">{risk.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      risk.impact === "high"
                        ? "bg-red-500"
                        : risk.impact === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    Impact:{" "}
                    {risk.impact === "high"
                      ? "Élevé"
                      : risk.impact === "medium"
                      ? "Moyen"
                      : "Faible"}
                  </span>
                </div>
                <p className="mt-2">{risk.description}</p>
                <p className="mt-2">
                  <strong>Probabilité:</strong>{" "}
                  {risk.probability === "high"
                    ? "Élevée"
                    : risk.probability === "medium"
                    ? "Moyenne"
                    : "Faible"}
                </p>
                <p className="mt-2">
                  <strong>Stratégie de mitigation:</strong> {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval */}
      <div className="mb-8 cdc-section  ">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
          Approbation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border p-4 rounded-md">
            <h3 className="font-bold mb-4">Client</h3>
            <p>
              <strong>Nom:</strong> {data.approval.clientName}
            </p>
            <p>
              <strong>Titre:</strong> {data.approval.clientTitle}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {formatDate(data.approval.clientSignatureDate)}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p>Signature:</p>
              <div className="h-16 border border-dashed border-gray-300 mt-2"></div>
            </div>
          </div>

          <div className="border p-4 rounded-md">
            <h3 className="font-bold mb-4">Prestataire</h3>
            <p>
              <strong>Nom:</strong> {data.approval.companyName}
            </p>
            <p>
              <strong>Titre:</strong> {data.approval.companyTitle}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {formatDate(data.approval.companySignatureDate)}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p>Signature:</p>
              <div className="h-16 border border-dashed border-gray-300 mt-2"></div>
            </div>
          </div>
        </div>

        {data.approval.notes && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Notes d&apos;approbation</h3>
            <p className="whitespace-pre-line">{data.approval.notes}</p>
          </div>
        )}
      </div>

      {/* Appendices */}
      {data.appendices && (
        <div className="mb-8 cdc-section  ">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Annexes
          </h2>
          <p className="whitespace-pre-line">{data.appendices}</p>
        </div>
      )}
    </div>
  );
});

// Add display name to component
CahierDesChargesPreviewComponent.displayName = "CahierDesChargesPreview";

// Export the component
export const CahierDesChargesPreview = CahierDesChargesPreviewComponent;
