"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContratDeConfidentialite, PartyInfo, ConfidentialityScope, LegalTerms, Obligations } from "./types";

interface ContratDeConfidentialiteFormProps {
  contratDeConfidentialite: ContratDeConfidentialite;
  onDisclosingPartyChange: (info: PartyInfo) => void;
  onReceivingPartyChange: (info: PartyInfo) => void;
  onScopeChange: (scope: ConfidentialityScope) => void;
  onLegalTermsChange: (terms: LegalTerms) => void;
  onObligationsChange: (obligations: Obligations) => void;
  onReciprocalChange: (reciprocal: boolean) => void;
}

export function ContratDeConfidentialiteForm({
  contratDeConfidentialite,
  onDisclosingPartyChange,
  onReceivingPartyChange,
  onScopeChange,
  onLegalTermsChange,
  onObligationsChange,
  // onReciprocalChange is currently unused but kept for future implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onReciprocalChange,
}: ContratDeConfidentialiteFormProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow text-black">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="disclosing-party">
          <AccordionTrigger className="text-black font-medium">Partie divulgatrice</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <div className="space-y-3">
                <Label htmlFor="disclosing-name">Nom</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="disclosing-name"
                  value={contratDeConfidentialite.disclosingParty.name}
                  onChange={(e) => onDisclosingPartyChange({
                    ...contratDeConfidentialite.disclosingParty,
                    name: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="disclosing-address">Adresse</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="disclosing-address"
                  value={contratDeConfidentialite.disclosingParty.address}
                  onChange={(e) => onDisclosingPartyChange({
                    ...contratDeConfidentialite.disclosingParty,
                    address: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="disclosing-email">Email</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="disclosing-email"
                  value={contratDeConfidentialite.disclosingParty.email}
                  onChange={(e) => onDisclosingPartyChange({
                    ...contratDeConfidentialite.disclosingParty,
                    email: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="disclosing-phone">Téléphone</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="disclosing-phone"
                  value={contratDeConfidentialite.disclosingParty.phone}
                  onChange={(e) => onDisclosingPartyChange({
                    ...contratDeConfidentialite.disclosingParty,
                    phone: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="receiving-party">
          <AccordionTrigger className="text-black font-medium">Partie réceptrice</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <div className="space-y-3">
                <Label htmlFor="receiving-name">Nom</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="receiving-name"
                  value={contratDeConfidentialite.receivingParty.name}
                  onChange={(e) => onReceivingPartyChange({
                    ...contratDeConfidentialite.receivingParty,
                    name: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="receiving-address">Adresse</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="receiving-address"
                  value={contratDeConfidentialite.receivingParty.address}
                  onChange={(e) => onReceivingPartyChange({
                    ...contratDeConfidentialite.receivingParty,
                    address: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="receiving-email">Email</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="receiving-email"
                  value={contratDeConfidentialite.receivingParty.email}
                  onChange={(e) => onReceivingPartyChange({
                    ...contratDeConfidentialite.receivingParty,
                    email: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="receiving-phone">Téléphone</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="receiving-phone"
                  value={contratDeConfidentialite.receivingParty.phone}
                  onChange={(e) => onReceivingPartyChange({
                    ...contratDeConfidentialite.receivingParty,
                    phone: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="scope-info">
          <AccordionTrigger className="text-black font-medium">Portée de la confidentialité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-3">
              <div className="space-y-3">
                <Label htmlFor="confidential-description">Description des informations confidentielles</Label>
                <Textarea
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="confidential-description"
                  value={contratDeConfidentialite.scope.confidentialInfoDescription}
                  onChange={(e) => onScopeChange({
                    ...contratDeConfidentialite.scope,
                    confidentialInfoDescription: e.target.value,
                  })}
                  rows={4}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="confidential-purpose">Objectif de la divulgation</Label>
                <Textarea
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="confidential-purpose"
                  value={contratDeConfidentialite.scope.purpose}
                  onChange={(e) => onScopeChange({
                    ...contratDeConfidentialite.scope,
                    purpose: e.target.value,
                  })}
                  rows={3}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="excluded-info">Informations exclues</Label>
                <Textarea
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="excluded-info"
                  value={contratDeConfidentialite.scope.excludedInfo}
                  onChange={(e) => onScopeChange({
                    ...contratDeConfidentialite.scope,
                    excludedInfo: e.target.value,
                  })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="duration-value">Durée (nombre)</Label>
                  <Input
                    className="text-black bg-white border-gray-300 focus:border-blue-500"
                    id="duration-value"
                    type="number"
                    value={contratDeConfidentialite.scope.duration.value}
                    onChange={(e) => onScopeChange({
                      ...contratDeConfidentialite.scope,
                      duration: {
                        ...contratDeConfidentialite.scope.duration,
                        value: parseInt(e.target.value),
                      },
                    })}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="duration-unit">Unité</Label>
                  <Input
                    className="text-black bg-white border-gray-300 focus:border-blue-500"
                    id="duration-unit"
                    value={contratDeConfidentialite.scope.duration.unit}
                    onChange={(e) => onScopeChange({
                      ...contratDeConfidentialite.scope,
                      duration: {
                        ...contratDeConfidentialite.scope.duration,
                        unit: e.target.value as "months" | "years",
                      },
                    })}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="obligations">
          <AccordionTrigger className="text-black font-medium">Obligations</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-3">
              <div className="space-y-3">
                <Label htmlFor="disclosure-restrictions">Restrictions de divulgation</Label>
                <Textarea
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="disclosure-restrictions"
                  value={contratDeConfidentialite.obligations.disclosureRestrictions}
                  onChange={(e) => onObligationsChange({
                    ...contratDeConfidentialite.obligations,
                    disclosureRestrictions: e.target.value,
                  })}
                  rows={3}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="protection-measures">Mesures de protection</Label>
                <Textarea
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="protection-measures"
                  value={contratDeConfidentialite.obligations.protectionMeasures}
                  onChange={(e) => onObligationsChange({
                    ...contratDeConfidentialite.obligations,
                    protectionMeasures: e.target.value,
                  })}
                  rows={3}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="legal-terms">
          <AccordionTrigger className="text-black font-medium">Termes légaux</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-3">
              <div className="space-y-3">
                <Label htmlFor="applicable-law">Loi applicable</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="applicable-law"
                  value={contratDeConfidentialite.legalTerms.applicableLaw}
                  onChange={(e) => onLegalTermsChange({
                    ...contratDeConfidentialite.legalTerms,
                    applicableLaw: e.target.value,
                  })}
                  placeholder="Ex: Droit français"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="dispute-resolution">Résolution des litiges</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="dispute-resolution"
                  value={contratDeConfidentialite.legalTerms.disputeResolution}
                  onChange={(e) => onLegalTermsChange({
                    ...contratDeConfidentialite.legalTerms,
                    disputeResolution: e.target.value,
                  })}
                  placeholder="Ex: Tribunal de Commerce de Paris"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="penalties">Pénalités</Label>
                <Textarea
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="penalties"
                  value={contratDeConfidentialite.legalTerms.penalties}
                  onChange={(e) => onLegalTermsChange({
                    ...contratDeConfidentialite.legalTerms,
                    penalties: e.target.value,
                  })}
                  rows={3}
                  placeholder="Ex: En cas de violation, des dommages-intérêts d'un montant de..."
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="additional-clauses">
          <AccordionTrigger className="text-black font-medium">Clauses additionnelles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-3">
              <Label htmlFor="additional-clauses">Clauses additionnelles</Label>
              <Textarea
                className="text-black bg-white border-gray-300 focus:border-blue-500"
                id="additional-clauses"
                value={contratDeConfidentialite.legalTerms.additionalClauses}
                onChange={(e) => onLegalTermsChange({
                  ...contratDeConfidentialite.legalTerms,
                  additionalClauses: e.target.value,
                })}
                rows={5}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
