"use client";

import { forwardRef, useState } from "react";
import { ClientInfo, EstimateInfo, EstimateItem, CompanyInfo } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface DevisPreviewProps {
  clientInfo: ClientInfo;
  estimateInfo: EstimateInfo;
  items: EstimateItem[];
  companyInfo: CompanyInfo;
  calculateSubtotal: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
}

export const DevisPreview = forwardRef<HTMLDivElement, DevisPreviewProps>(
  ({ clientInfo, estimateInfo, items, companyInfo, calculateSubtotal, calculateTax, calculateTotal }, ref) => {
    const [currentPage, setCurrentPage] = useState<1 | 2>(1);
    const hasTerms = estimateInfo.termsAndConditions && estimateInfo.termsAndConditions.trim().length > 0;
    const totalPages = hasTerms ? 2 : 1;
    return (
      <div ref={ref} className="relative border border-border rounded-lg bg-white p-10 shadow-sm text-black print:p-10 print:shadow-none print:border-0" style={{ width: "210mm", minHeight: "297mm", margin: "0 auto" }}>
        {/* Page Navigation */}
        {totalPages > 1 && (
          <div className="absolute top-2 right-2 flex items-center space-x-2 bg-white rounded-md shadow-sm border border-border px-2 py-1 z-10">
            <button 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium">{currentPage}/{totalPages}</span>
            <button 
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2 || totalPages === 1}
              className={`p-1 rounded ${currentPage === 2 || totalPages === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {/* Main Content Section - First Page */}
        <div className={`main-content ${currentPage === 1 ? 'block' : 'hidden'}`} style={{ minHeight: '277mm' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold">{estimateInfo.title}</h1>
            <p className="text-gray-600">{estimateInfo.date}</p>
          </div>
          <div className="text-right">
            {companyInfo.logo && (
              <div className="w-16 h-16 mb-2">
                <Image 
                  src={companyInfo.logo} 
                  alt="Logo" 
                  width={64} 
                  height={64} 
                  className="w-full h-full object-contain" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Sender and Recipient */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Émetteur</h3>
            <table className="text-sm w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-4 font-medium text-gray-600">Société:</td>
                  <td className="py-1 font-medium">{companyInfo.name || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Contact:</td>
                  <td className="py-1">{companyInfo.contactName || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Adresse:</td>
                  <td className="py-1">{companyInfo.address || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Ville:</td>
                  <td className="py-1">{companyInfo.zipCity || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Pays:</td>
                  <td className="py-1">{companyInfo.country || "—"}</td>
                </tr>
                <tr className="border-t border-gray-200 mt-2">
                  <td className="py-1 pr-4 text-gray-600 pt-2">SIRET:</td>
                  <td className="py-1 pt-2">{companyInfo.companyNumber || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">APE:</td>
                  <td className="py-1">{companyInfo.activityCode || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">TVA:</td>
                  <td className="py-1">{companyInfo.vatNumber || "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-3 text-lg border-b border-gray-300 pb-2 text-primary">Destinataire</h3>
            <table className="text-sm w-full">
              <tbody>
                {clientInfo.isCompany ? (
                  // Company information
                  <>
                    <tr>
                      <td className="py-1 pr-4 font-medium text-gray-600">Société:</td>
                      <td className="py-1 font-medium">{clientInfo.companyName || "—"}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Contact:</td>
                      <td className="py-1">{clientInfo.contactPerson || "—"}</td>
                    </tr>
                    <tr className="border-t border-gray-200 mt-2">
                      <td className="py-1 pr-4 text-gray-600 pt-2">Numéro de TVA:</td>
                      <td className="py-1 pt-2">{clientInfo.vatNumber || "—"}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">SIRET/SIREN:</td>
                      <td className="py-1">{clientInfo.registrationNumber || "—"}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-600">Site web:</td>
                      <td className="py-1">{clientInfo.website || "—"}</td>
                    </tr>
                  </>
                ) : (
                  // Individual information
                  <tr>
                    <td className="py-1 pr-4 font-medium text-gray-600">Nom:</td>
                    <td className="py-1 font-medium">{clientInfo.name || "—"}</td>
                  </tr>
                )}
                <tr className={clientInfo.isCompany ? "" : "border-t border-gray-200 mt-2"}>
                  <td className={`py-1 pr-4 text-gray-600 ${clientInfo.isCompany ? "" : "pt-2"}`}>Adresse:</td>
                  <td className={`py-1 ${clientInfo.isCompany ? "" : "pt-2"}`}>{clientInfo.address || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Pays:</td>
                  <td className="py-1">{clientInfo.country || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Email:</td>
                  <td className="py-1">{clientInfo.email || "—"}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Téléphone:</td>
                  <td className="py-1">{clientInfo.phone || "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-sm">{companyInfo.description}</p>
        </div>

        {/* Items */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Détail</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-2 px-2 text-left">Type</th>
                <th className="py-2 px-2 text-left">Description</th>
                <th className="py-2 px-2 text-right">Prix unitaire HT</th>
                <th className="py-2 px-2 text-right">Quantité</th>
                <th className="py-2 px-2 text-right">TVA</th>
                <th className="py-2 px-2 text-right">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-2 px-2">{item.type || "Service"}</td>
                  <td className="py-2 px-2">{item.description || "—"}</td>
                  <td className="py-2 px-2 text-right">{item.unitPrice.toFixed(2)} €</td>
                  <td className="py-2 px-2 text-right">{item.quantity}</td>
                  <td className="py-2 px-2 text-right">{item.tax}%</td>
                  <td className="py-2 px-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-4 flex justify-end">
            <table className="text-sm">
              <tbody>
                <tr>
                  <td className="py-1 pr-8 text-right font-medium">Total HT:</td>
                  <td className="py-1 text-right">{calculateSubtotal().toFixed(2)} €</td>
                </tr>
                <tr>
                  <td className="py-1 pr-8 text-right font-medium">TVA ({items[0]?.tax || 20}%):</td>
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

        {/* Terms */}
        <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-3 text-lg border-b border-gray-300 pb-2 text-primary">Conditions</h3>
          <div className="grid grid-cols-2 gap-4">
            <table className="text-sm w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Conditions de règlement:</td>
                  <td className="py-1 font-medium">{estimateInfo.paymentTerms}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Mode de règlement:</td>
                  <td className="py-1 font-medium">{estimateInfo.paymentMethod}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-600">Validité du devis:</td>
                  <td className="py-1 font-medium">{estimateInfo.validity}</td>
                </tr>
              </tbody>
            </table>
            
            <div className="border-l border-gray-200 pl-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Coordonnées bancaires:</p>
              <p className="text-sm mb-1"><span className="text-gray-600">COMPTE:</span> <span className="font-medium">{companyInfo.name}</span></p>
              <p className="text-sm mb-1"><span className="text-gray-600">IBAN:</span> <span className="font-medium">{companyInfo.iban}</span></p>
              <p className="text-sm"><span className="text-gray-600">BIC:</span> <span className="font-medium">{companyInfo.bic}</span></p>
            </div>
          </div>
          
          {estimateInfo.notes && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">Notes:</p>
              <p className="text-sm whitespace-pre-wrap bg-white p-3 rounded border border-gray-200">{estimateInfo.notes}</p>
            </div>
          )}
        </div>
        </div>

        {/* Page Separator - Visual indicator for page break */}
        {hasTerms && currentPage === 1 && (
          <div className="border-t border-dashed border-gray-300 mt-4 pt-2">
            <div className="absolute bottom-2 right-4">
              <span className="text-xs text-gray-500">Page 1/{totalPages}</span>
            </div>
          </div>
        )}

        {/* Terms and Conditions - Second Page */}
        <div className={`terms-content page-break-before ${currentPage === 2 ? 'block' : 'hidden'}`} style={{ minHeight: '277mm', position: 'relative' }}>
          <div className="py-10">
            <h3 className="font-semibold mb-6 text-center text-xl text-primary border-b border-gray-300 pb-3 mx-10">Conditions générales de vente</h3>
            <div className="mx-10 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{estimateInfo.termsAndConditions}</p>
            </div>
          </div>
        </div>
        
        {/* Page footer - only shown in preview */}
        {currentPage === 2 && (
          <div className="absolute bottom-2 right-4">
            <span className="text-xs text-gray-500">Page 2/{totalPages}</span>
          </div>
        )}
      </div>
    );
  }
);

DevisPreview.displayName = "DevisPreview";
