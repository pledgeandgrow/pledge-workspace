"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ClientInfo, InvoiceInfo, InvoiceItem, CompanyInfo } from "./types";

interface FactureFormProps {
  clientInfo: ClientInfo;
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfo>>;
  invoiceInfo: InvoiceInfo;
  setInvoiceInfo: React.Dispatch<React.SetStateAction<InvoiceInfo>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  items: InvoiceItem[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
  addItem: () => void;
  updateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  removeItem: (id: string) => void;
  calculateSubtotal: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
}

export function FactureForm({
  clientInfo,
  setClientInfo,
  invoiceInfo,
  setInvoiceInfo,
  companyInfo,
  setCompanyInfo,
  items,
  addItem,
  updateItem,
  removeItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
}: FactureFormProps) {
  const [activeTab, setActiveTab] = useState<"client" | "company" | "invoice" | "items">("client");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "client"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("client")}
        >
          Client
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "invoice"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("invoice")}
        >
          Facture
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "items"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("items")}
        >
          Articles
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "company"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("company")}
        >
          Entreprise
        </button>
      </div>

      {/* Client Information */}
      {activeTab === "client" && (
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Informations du client</h3>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Entreprise</label>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
                checked={clientInfo.isCompany}
                onChange={(e) => setClientInfo({ ...clientInfo, isCompany: e.target.checked })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {clientInfo.isCompany ? (
              // Company information fields
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom de l&apos;entreprise</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={clientInfo.companyName}
                    onChange={(e) => setClientInfo({ ...clientInfo, companyName: e.target.value })}
                    placeholder="Nom de l&apos;entreprise"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Personne de contact</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={clientInfo.contactPerson}
                    onChange={(e) => setClientInfo({ ...clientInfo, contactPerson: e.target.value })}
                    placeholder="Personne de contact"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Numéro de TVA</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={clientInfo.vatNumber}
                    onChange={(e) => setClientInfo({ ...clientInfo, vatNumber: e.target.value })}
                    placeholder="Numéro de TVA"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Numéro d&apos;immatriculation</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={clientInfo.registrationNumber}
                    onChange={(e) => setClientInfo({ ...clientInfo, registrationNumber: e.target.value })}
                    placeholder="SIRET, SIREN, RCS, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Site web</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={clientInfo.website}
                    onChange={(e) => setClientInfo({ ...clientInfo, website: e.target.value })}
                    placeholder="Site web"
                  />
                </div>
              </>
            ) : (
              // Individual client information fields
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom du client</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    placeholder="Nom du client"
                  />
                </div>
              </>
            )}
            
            {/* Common fields for both company and individual */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                placeholder="Email du client"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={clientInfo.address}
                onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                placeholder="Adresse du client"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                placeholder="Téléphone du client"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pays</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={clientInfo.country}
                onChange={(e) => setClientInfo({ ...clientInfo, country: e.target.value })}
                placeholder="Pays du client"
              />
            </div>
          </div>
        </div>
      )}

      {/* Invoice Information */}
      {activeTab === "invoice" && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Informations de la facture</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.title}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, title: e.target.value })}
                placeholder="Titre de la facture"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.number}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, number: e.target.value })}
                placeholder="Numéro de facture"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date d&apos;émission</label>
              <input
                type="date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.date}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date d&apos;échéance</label>
              <input
                type="date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.dueDate}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Conditions de règlement</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.paymentTerms}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, paymentTerms: e.target.value })}
                placeholder="Ex: 30 jours"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mode de règlement</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.paymentMethod}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, paymentMethod: e.target.value })}
                placeholder="Ex: Virement bancaire"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Référence devis</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.referenceDevis}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, referenceDevis: e.target.value })}
                placeholder="Référence du devis associé"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={invoiceInfo.status}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, status: e.target.value as 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' })}
              >
                <option value="draft">Brouillon</option>
                <option value="sent">Envoyée</option>
                <option value="paid">Payée</option>
                <option value="overdue">En retard</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={3}
                value={invoiceInfo.notes}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, notes: e.target.value })}
                placeholder="Notes additionnelles"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Conditions générales de vente</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={5}
                value={invoiceInfo.termsAndConditions}
                onChange={(e) => setInvoiceInfo({ ...invoiceInfo, termsAndConditions: e.target.value })}
                placeholder="Conditions générales de vente"
              />
            </div>
          </div>
        </div>
      )}

      {/* Items */}
      {activeTab === "items" && (
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Articles</h3>
            <Button size="sm" variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter un article
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Article {index + 1}</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={item.type}
                      onChange={(e) => updateItem(item.id, "type", e.target.value)}
                      placeholder="Type d&apos;article"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Description de l&apos;article"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prix unitaire (HT)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                      placeholder="Prix unitaire"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantité</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                      placeholder="Quantité"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">TVA (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={item.tax}
                      onChange={(e) => updateItem(item.id, "tax", parseFloat(e.target.value) || 0)}
                      placeholder="Taux de TVA"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Total HT</label>
                    <div className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-500">
                      {(item.quantity * item.unitPrice).toFixed(2)} €
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {items.length > 0 && (
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-end">
                  <table className="text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-8 text-right font-medium">Total HT:</td>
                        <td className="py-1 text-right">{calculateSubtotal().toFixed(2)} €</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-8 text-right font-medium">TVA:</td>
                        <td className="py-1 text-right">{calculateTax().toFixed(2)} €</td>
                      </tr>
                      <tr className="font-bold">
                        <td className="py-1 pr-8 text-right">Total TTC:</td>
                        <td className="py-1 text-right">{calculateTotal().toFixed(2)} €</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Company Information */}
      {activeTab === "company" && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Informations de l&apos;entreprise</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de l&apos;entreprise</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                placeholder="Nom de l&apos;entreprise"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du contact</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.contactName}
                onChange={(e) => setCompanyInfo({ ...companyInfo, contactName: e.target.value })}
                placeholder="Nom du contact"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                placeholder="Adresse"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Code postal et ville</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.zipCity}
                onChange={(e) => setCompanyInfo({ ...companyInfo, zipCity: e.target.value })}
                placeholder="Code postal et ville"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pays</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.country}
                onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                placeholder="Pays"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro SIRET</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.companyNumber}
                onChange={(e) => setCompanyInfo({ ...companyInfo, companyNumber: e.target.value })}
                placeholder="Numéro SIRET"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Code APE</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.activityCode}
                onChange={(e) => setCompanyInfo({ ...companyInfo, activityCode: e.target.value })}
                placeholder="Code APE"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro de TVA</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.vatNumber}
                onChange={(e) => setCompanyInfo({ ...companyInfo, vatNumber: e.target.value })}
                placeholder="Numéro de TVA"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                placeholder="Téléphone"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Site web</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.website}
                onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                placeholder="Site web"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">IBAN</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.iban}
                onChange={(e) => setCompanyInfo({ ...companyInfo, iban: e.target.value })}
                placeholder="IBAN"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">BIC</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={companyInfo.bic}
                onChange={(e) => setCompanyInfo({ ...companyInfo, bic: e.target.value })}
                placeholder="BIC"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={3}
                value={companyInfo.description}
                onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                placeholder="Description de l'entreprise"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FactureForm;
