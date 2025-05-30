"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ClientInfo, EstimateInfo, EstimateItem, CompanyInfo } from "./types";

interface DevisFormProps {
  clientInfo: ClientInfo;
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfo>>;
  estimateInfo: EstimateInfo;
  setEstimateInfo: React.Dispatch<React.SetStateAction<EstimateInfo>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  items: EstimateItem[];
  setItems: React.Dispatch<React.SetStateAction<EstimateItem[]>>;
  addItem: () => void;
  updateItem: (id: string, field: keyof EstimateItem, value: string | number) => void;
  removeItem: (id: string) => void;
  calculateSubtotal: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
}

export function DevisForm({
  clientInfo,
  setClientInfo,
  estimateInfo,
  setEstimateInfo,
  companyInfo,
  setCompanyInfo,
  items,
  addItem,
  updateItem,
  removeItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal
}: DevisFormProps) {
  const [activeTab, setActiveTab] = useState<"client" | "company" | "estimate" | "items">("client");

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
            activeTab === "estimate"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("estimate")}
        >
          Devis
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
            {clientInfo.isCompany && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom de l&apos;entreprise</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                    value={clientInfo.companyName}
                    onChange={(e) => setClientInfo({ ...clientInfo, companyName: e.target.value })}
                    placeholder="Nom de l&apos;entreprise"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Personne de contact</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                    value={clientInfo.contactPerson}
                    onChange={(e) => setClientInfo({ ...clientInfo, contactPerson: e.target.value })}
                    placeholder="Personne de contact"
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du client</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                placeholder="Nom du client"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={clientInfo.address}
                onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                placeholder="Adresse"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <input
                type="tel"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                placeholder="Téléphone"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pays</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={clientInfo.country}
                onChange={(e) => setClientInfo({ ...clientInfo, country: e.target.value })}
                placeholder="Pays"
              />
            </div>
            {clientInfo.isCompany && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Numéro de TVA</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                    value={clientInfo.vatNumber}
                    onChange={(e) => setClientInfo({ ...clientInfo, vatNumber: e.target.value })}
                    placeholder="Numéro de TVA"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Numéro d&apos;immatriculation</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                    value={clientInfo.registrationNumber}
                    onChange={(e) => setClientInfo({ ...clientInfo, registrationNumber: e.target.value })}
                    placeholder="Numéro d&apos;immatriculation"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Estimate Information */}
      {activeTab === "estimate" && (
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Informations du devis</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={estimateInfo.title}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, title: e.target.value })}
                placeholder="Titre du devis"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={estimateInfo.number}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, number: e.target.value })}
                placeholder="Numéro du devis"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={estimateInfo.date}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valide jusqu&apos;au</label>
              <input
                type="date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={estimateInfo.validUntil}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, validUntil: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Conditions de règlement</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={estimateInfo.paymentTerms}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, paymentTerms: e.target.value })}
                placeholder="Ex: 120 jours"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mode de règlement</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={estimateInfo.paymentMethod}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, paymentMethod: e.target.value })}
                placeholder="Ex: Virement bancaire"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Validité du devis</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={estimateInfo.validity}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, validity: e.target.value })}
                placeholder="Ex: 120 jours"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                rows={3}
                value={estimateInfo.notes}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, notes: e.target.value })}
                placeholder="Notes ou conditions supplémentaires"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Conditions générales de vente</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                rows={5}
                value={estimateInfo.termsAndConditions}
                onChange={(e) => setEstimateInfo({ ...estimateInfo, termsAndConditions: e.target.value })}
                placeholder="Conditions générales de vente"
              />
            </div>
          </div>
        </div>
      )}

      {/* Company Information */}
      {activeTab === "company" && (
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Informations de l&apos;entreprise</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de l&apos;entreprise</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                placeholder="Nom de l&apos;entreprise"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du contact</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.contactName}
                onChange={(e) => setCompanyInfo({ ...companyInfo, contactName: e.target.value })}
                placeholder="Nom du contact"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                placeholder="Adresse"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Code postal et ville</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.zipCity}
                onChange={(e) => setCompanyInfo({ ...companyInfo, zipCity: e.target.value })}
                placeholder="Code postal et ville"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pays</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.country}
                onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                placeholder="Pays"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro d&apos;entreprise</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.companyNumber}
                onChange={(e) => setCompanyInfo({ ...companyInfo, companyNumber: e.target.value })}
                placeholder="Numéro d&apos;entreprise"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Code d&apos;activité</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.activityCode}
                onChange={(e) => setCompanyInfo({ ...companyInfo, activityCode: e.target.value })}
                placeholder="Code d&apos;activité"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro de TVA</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.vatNumber}
                onChange={(e) => setCompanyInfo({ ...companyInfo, vatNumber: e.target.value })}
                placeholder="Numéro de TVA"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <input
                type="tel"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                placeholder="Téléphone"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Site web</label>
              <input
                type="url"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.website}
                onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                placeholder="Site web"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                rows={2}
                value={companyInfo.description}
                onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                placeholder="Description de l'entreprise"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">IBAN</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.iban}
                onChange={(e) => setCompanyInfo({ ...companyInfo, iban: e.target.value })}
                placeholder="IBAN"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">BIC</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={companyInfo.bic}
                onChange={(e) => setCompanyInfo({ ...companyInfo, bic: e.target.value })}
                placeholder="BIC"
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
            <Button size="sm" onClick={addItem} className="bg-primary text-white hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-1" /> Ajouter un article
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 text-left font-medium text-sm text-gray-600">Type</th>
                  <th className="py-2 text-left font-medium text-sm text-gray-600">Description</th>
                  <th className="py-2 text-left font-medium text-sm text-gray-600">Quantité</th>
                  <th className="py-2 text-left font-medium text-sm text-gray-600">Prix unitaire</th>
                  <th className="py-2 text-left font-medium text-sm text-gray-600">TVA (%)</th>
                  <th className="py-2 text-left font-medium text-sm text-gray-600">Total HT</th>
                  <th className="py-2 text-left font-medium text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3">
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-white"
                        value={item.type}
                        onChange={(e) => updateItem(item.id, "type", e.target.value)}
                      >
                        <option value="Service">Service</option>
                        <option value="Produit">Produit</option>
                        <option value="Abonnement">Abonnement</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <input
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-white"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Description"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-white"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value))}
                        min="1"
                        step="1"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-white"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value))}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-white"
                        value={item.tax}
                        onChange={(e) => updateItem(item.id, "tax", parseFloat(e.target.value))}
                        min="0"
                        step="0.1"
                      />
                    </td>
                    <td className="py-3 text-right font-medium text-white">
                      {(item.quantity * item.unitPrice).toFixed(2)} €
                    </td>
                    <td className="py-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td colSpan={5} className="py-3 text-right font-medium text-gray-700">
                    Sous-total:
                  </td>
                  <td className="py-3 text-right text-white">{calculateSubtotal().toFixed(2)} €</td>
                  <td></td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td colSpan={5} className="py-3 text-right font-medium text-gray-700">
                    TVA:
                  </td>
                  <td className="py-3 text-right text-white">{calculateTax().toFixed(2)} €</td>
                  <td></td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td colSpan={5} className="py-3 text-right font-medium text-gray-700">
                    Total TTC:
                  </td>
                  <td className="py-3 text-right font-bold text-primary">
                    {calculateTotal().toFixed(2)} €
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default DevisForm;
