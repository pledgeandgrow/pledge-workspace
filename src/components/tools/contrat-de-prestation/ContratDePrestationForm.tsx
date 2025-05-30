"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContratDePrestation, ClientInfo, ProviderInfo, PaymentConditions, ContractDuration, ContractInfo, ServiceItem } from "./types";

interface ContratDePrestationFormProps {
  contratDePrestation: ContratDePrestation;
  setClientInfo: (info: ClientInfo) => void;
  setProviderInfo: (info: ProviderInfo) => void;
  setServiceItems: (items: ServiceItem[]) => void;
  setPaymentConditions: (terms: PaymentConditions) => void;
  setContractDuration: (duration: ContractDuration) => void;
  setContractInfo: (info: ContractInfo) => void;
  addServiceItem: () => void;
  updateServiceItem: (id: string, field: keyof ServiceItem, value: string | number) => void;
  removeServiceItem: (id: string) => void;
}

export function ContratDePrestationForm({
  contratDePrestation,
  setClientInfo,
  setProviderInfo,
  setServiceItems,
  setPaymentConditions,
  setContractDuration,
  setContractInfo,
  addServiceItem,
  updateServiceItem,
  removeServiceItem,
}: ContratDePrestationFormProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="client-info">
          <AccordionTrigger>Informations sur le client</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Nom du client</Label>
                <Input
                  id="client-name"
                  value={contratDePrestation.clientInfo.name}
                  onChange={(e) => setClientInfo({
                    ...contratDePrestation.clientInfo,
                    name: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-address">Adresse</Label>
                <Input
                  id="client-address"
                  value={contratDePrestation.clientInfo.address}
                  onChange={(e) => setClientInfo({
                    ...contratDePrestation.clientInfo,
                    address: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-siret">SIRET</Label>
                <Input
                  id="client-siret"
                  value={contratDePrestation.clientInfo.siret || ""}
                  onChange={(e) => setClientInfo({
                    ...contratDePrestation.clientInfo,
                    siret: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-contact">Contact</Label>
                <Input
                  id="client-contact"
                  value={contratDePrestation.clientInfo.contactPerson || ""}
                  onChange={(e) => setClientInfo({
                    ...contratDePrestation.clientInfo,
                    contactPerson: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="provider-info">
          <AccordionTrigger>Informations sur le prestataire</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provider-name">Nom du prestataire</Label>
                <Input
                  id="provider-name"
                  value={contratDePrestation.providerInfo.name}
                  onChange={(e) => setProviderInfo({
                    ...contratDePrestation.providerInfo,
                    name: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider-address">Adresse</Label>
                <Input
                  id="provider-address"
                  value={contratDePrestation.providerInfo.address}
                  onChange={(e) => setProviderInfo({
                    ...contratDePrestation.providerInfo,
                    address: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider-siret">SIRET</Label>
                <Input
                  id="provider-siret"
                  value={contratDePrestation.providerInfo.siret || ""}
                  onChange={(e) => setProviderInfo({
                    ...contratDePrestation.providerInfo,
                    siret: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider-contact">Contact</Label>
                <Input
                  id="provider-contact"
                  value={contratDePrestation.providerInfo.representativeName || ""}
                  onChange={(e) => setProviderInfo({
                    ...contratDePrestation.providerInfo,
                    representativeName: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="service-info">
          <AccordionTrigger>Description des services</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-title">Titre du service</Label>
                <Input
                  id="service-title"
                  value={contratDePrestation.contractInfo.title}
                  onChange={(e) => setContractInfo({
                    ...contratDePrestation.contractInfo,
                    title: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-description">Description détaillée</Label>
                <Textarea
                  id="service-description"
                  value={contratDePrestation.contractInfo.description}
                  onChange={(e) => setContractInfo({
                    ...contratDePrestation.contractInfo,
                    description: e.target.value,
                  })}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-deliverables">Livrables</Label>
                <Textarea
                  id="service-deliverables"
                  value={contratDePrestation.contractInfo.deliverables}
                  onChange={(e) => setContractInfo({
                    ...contratDePrestation.contractInfo,
                    deliverables: e.target.value,
                  })}
                  rows={3}
                />
              </div>
              
              <div className="space-y-4 mt-6 border-t pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Articles et prestations</h3>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="secondary"
                      onClick={() => {
                        // Example of using setServiceItems to update all items at once
                        // This recalculates all totals
                        const updatedItems = contratDePrestation.serviceItems.map(item => ({
                          ...item,
                          totalHT: item.quantity * item.unitPrice,
                          totalTTC: item.quantity * item.unitPrice * (1 + item.tvaRate / 100)
                        }));
                        setServiceItems(updatedItems);
                      }}
                    >
                      Recalculer les totaux
                    </Button>
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline"
                      onClick={() => addServiceItem()}
                    >
                      Ajouter un article
                    </Button>
                  </div>
                </div>
                
                {contratDePrestation.serviceItems.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Aucun article ajouté</p>
                ) : (
                  <div className="space-y-4">
                    {contratDePrestation.serviceItems.map((item) => (
                      <div key={item.id} className="border p-4 rounded-md space-y-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Article</h4>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="destructive"
                            onClick={() => removeServiceItem(item.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`item-desc-${item.id}`}>Description</Label>
                          <Input
                            id={`item-desc-${item.id}`}
                            value={item.description}
                            onChange={(e) => updateServiceItem(item.id, 'description', e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`item-qty-${item.id}`}>Quantité</Label>
                            <Input
                              id={`item-qty-${item.id}`}
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateServiceItem(item.id, 'quantity', parseInt(e.target.value))}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`item-price-${item.id}`}>Prix unitaire (€)</Label>
                            <Input
                              id={`item-price-${item.id}`}
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateServiceItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`item-tva-${item.id}`}>TVA (%)</Label>
                            <Input
                              id={`item-tva-${item.id}`}
                              type="number"
                              value={item.tvaRate}
                              onChange={(e) => updateServiceItem(item.id, 'tvaRate', parseFloat(e.target.value))}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between pt-2 text-sm font-medium">
                          <span>Total HT: {(item.quantity * item.unitPrice).toFixed(2)} €</span>
                          <span>Total TTC: {(item.quantity * item.unitPrice * (1 + item.tvaRate / 100)).toFixed(2)} €</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end space-x-4 font-medium text-right pt-2 border-t">
                      <div>
                        <p>Total HT: {contratDePrestation.totalHT.toFixed(2)} €</p>
                        <p>Total TVA: {contratDePrestation.totalTVA.toFixed(2)} €</p>
                        <p className="text-lg">Total TTC: {contratDePrestation.totalTTC.toFixed(2)} €</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="financial-terms">
          <AccordionTrigger>Conditions financières</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix total (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={contratDePrestation.paymentConditions.method === "autre" ? "" : contratDePrestation.paymentConditions.method}
                  onChange={(e) => setPaymentConditions({
                    ...contratDePrestation.paymentConditions,
                    method: e.target.value as "virement" | "chèque" | "espèces" | "carte" | "prélèvement" | "autre",
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-schedule">Échéancier de paiement</Label>
                <Textarea
                  id="payment-schedule"
                  value={contratDePrestation.paymentConditions.terms}
                  onChange={(e) => setPaymentConditions({
                    ...contratDePrestation.paymentConditions,
                    terms: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="timeline">
          <AccordionTrigger>Calendrier</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Date de début</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={contratDePrestation.contractDuration.startDate}
                  onChange={(e) => setContractDuration({
                    ...contratDePrestation.contractDuration,
                    startDate: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">Date de fin</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={contratDePrestation.contractDuration.endDate}
                  onChange={(e) => setContractDuration({
                    ...contratDePrestation.contractDuration,
                    endDate: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="milestones">Jalons</Label>
                <Textarea
                  id="milestones"
                  value={contratDePrestation.contractDuration.terminationNotice}
                  onChange={(e) => setContractDuration({
                    ...contratDePrestation.contractDuration,
                    terminationNotice: e.target.value,
                  })}
                  rows={3}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="legal-terms">
          <AccordionTrigger>Conditions légales</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="confidentiality">Confidentialité</Label>
                <Textarea
                  id="confidentiality"
                  value={contratDePrestation.contractInfo.confidentiality}
                  onChange={(e) => setContractInfo({
                    ...contratDePrestation.contractInfo,
                    confidentiality: e.target.value,
                  })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intellectual-property">Propriété intellectuelle</Label>
                <Textarea
                  id="intellectual-property"
                  value={contratDePrestation.contractInfo.intellectualProperty}
                  onChange={(e) => setContractInfo({
                    ...contratDePrestation.contractInfo,
                    intellectualProperty: e.target.value,
                  })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="termination">Résiliation</Label>
                <Textarea
                  id="termination"
                  value={contratDePrestation.contractInfo.warranties || ""}
                  onChange={(e) => setContractInfo({
                    ...contratDePrestation.contractInfo,
                    warranties: e.target.value,
                  })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicable-law">Loi applicable</Label>
                <Input
                  id="applicable-law"
                  value={contratDePrestation.contractInfo.applicableLaw}
                  onChange={(e) => setContractInfo({
                    ...contratDePrestation.contractInfo,
                    applicableLaw: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="additional-clauses">
          <AccordionTrigger>Clauses additionnelles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="additional-clauses">Clauses additionnelles</Label>
              <Textarea
                id="additional-clauses"
                value={contratDePrestation.contractInfo.additionalClauses}
                onChange={(e) => setContractInfo({ ...contratDePrestation.contractInfo, additionalClauses: e.target.value })}
                rows={5}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
