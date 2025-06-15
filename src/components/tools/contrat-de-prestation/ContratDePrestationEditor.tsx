"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ContratDePrestationPreview } from "./ContratDePrestationPreview";
import { ContratDePrestationForm } from "./ContratDePrestationForm";
import {
  ContratDePrestation,
  ClientInfo,
  ProviderInfo,
  ServiceItem,
  PaymentConditions,
  ContractDuration,
  ContractInfo,
} from "./types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function ContratDePrestationEditor() {
  const { toast } = useToast();
  const documentRef = useRef<HTMLDivElement>(null);

  // Initialize with default values
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    type: "company",
    name: "",
    address: "",
    postalCode: "",
    city: "",
    country: "France",
    email: "",
    phone: "",
    contactPerson: "",
    siret: "",
    tvaNumber: "",
  });

  const [providerInfo, setProviderInfo] = useState<ProviderInfo>({
    name: "PLEDGE AND GROW",
    address: "4bis Rue Alfred Nobel",
    postalCode: "77420",
    city: "Champs-sur-marne",
    country: "France",
    siret: "93157766200014",
    activityCode: "6201Z",
    tvaNumber: "FR38931577662",
    email: "contact@pledgeandgrow.com",
    phone: "+33 7 53 69 58 40",
    website: "https://www.pledgeandgrow.com/",
    representativeName: "Mehdi Berel",
    representativeTitle: "Directeur",
    bankDetails: {
      bankName: "Banque Populaire",
      iban: "FR76 XXXX XXXX XXXX XXXX XXXX XXX",
      bic: "BPXXXXX",
    },
  });

  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    {
      id: "1",
      description: "Développement de site web",
      quantity: 1,
      unitPrice: 1500,
      tvaRate: 20,
      totalHT: 1500,
      totalTTC: 1800,
    },
  ]);

  const [paymentConditions, setPaymentConditions] = useState<PaymentConditions>(
    {
      method: "virement",
      terms: "Paiement à réception de facture",
      deadlineInDays: 30,
      advancePayment: {
        percentage: 30,
        amount: 540,
      },
      penalties:
        "Pénalités de retard au taux annuel de 12%, exigibles sans qu'un rappel soit nécessaire",
    }
  );

  const [contractDuration, setContractDuration] = useState<ContractDuration>({
    type: "project",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    renewalTerms: "Renouvellement par accord écrit des deux parties",
    terminationNotice:
      "Préavis de 30 jours par lettre recommandée avec accusé de réception",
  });

  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);

  useEffect(() => {
    const now = new Date();
    const reference = `CONTRAT-${now.getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;
    const date = now.toISOString().split("T")[0];

    setContractInfo({
      reference,
      date,
      title: "Contrat de prestation de services",
      description:
        "Le présent contrat a pour objet de définir les conditions dans lesquelles le Prestataire s'engage à réaliser les prestations décrites ci-après pour le compte du Client.",
      scope:
        "Les prestations comprennent la conception, le développement et la mise en ligne d'un site web professionnel.",
      deliverables:
        "Site web responsive, documentation technique, formation à l'utilisation du back-office.",
      timeline:
        "Phase 1: Conception (2 semaines), Phase 2: Développement (4 semaines), Phase 3: Tests et déploiement (2 semaines).",
      location:
        "Les prestations seront réalisées dans les locaux du Prestataire.",
      confidentiality:
        "Les parties s'engagent à garder confidentielles les informations échangées dans le cadre de ce contrat, pendant toute la durée du contrat et pour une période de 2 ans après sa fin.",
      intellectualProperty:
        "Le Prestataire cède au Client l'ensemble des droits de propriété intellectuelle sur les livrables, après paiement intégral des prestations.",
      warranties:
        "Le Prestataire garantit que les livrables sont conformes aux spécifications pendant une durée de 3 mois à compter de la livraison finale.",
      liabilities:
        "La responsabilité du Prestataire est limitée au montant total du contrat. Le Prestataire ne pourra être tenu responsable des dommages indirects.",
      forceMajeure:
        "Aucune partie ne sera tenue responsable de la non-exécution de ses obligations en cas de force majeure.",
      disputeResolution:
        "En cas de litige, les parties s'efforceront de régler leur différend à l'amiable. À défaut, le litige sera porté devant les tribunaux compétents.",
      applicableLaw: "Le présent contrat est soumis au droit français.",
      additionalClauses: "",
    });
  }, []);

  // Calculate totals
  const calculateTotals = () => {
    const totalHT = serviceItems.reduce((sum, item) => sum + item.totalHT, 0);
    const totalTVA = serviceItems.reduce(
      (sum, item) => sum + (item.totalHT * item.tvaRate) / 100,
      0
    );
    const totalTTC = serviceItems.reduce((sum, item) => sum + item.totalTTC, 0);

    return { totalHT, totalTVA, totalTTC };
  };

  const { totalHT, totalTVA, totalTTC } = calculateTotals();

  if (!contractInfo) return null;

  const contratDePrestation: ContratDePrestation = {
    clientInfo,
    providerInfo,
    serviceItems,
    paymentConditions,
    contractDuration,
    contractInfo,
    totalHT,
    totalTVA,
    totalTTC,
  };

  const addServiceItem = () => {
    const newItem: ServiceItem = {
      id: `${serviceItems.length + 1}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
      tvaRate: 20,
      totalHT: 0,
      totalTTC: 0,
    };
    setServiceItems([...serviceItems, newItem]);
  };

  const updateServiceItem = (
    id: string,
    field: keyof ServiceItem,
    value: string | number
  ) => {
    setServiceItems(
      serviceItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate totals if quantity, unitPrice, or tvaRate changes
          if (
            field === "quantity" ||
            field === "unitPrice" ||
            field === "tvaRate"
          ) {
            const totalHT = updatedItem.quantity * updatedItem.unitPrice;
            const totalTTC = totalHT * (1 + updatedItem.tvaRate / 100);

            return {
              ...updatedItem,
              totalHT,
              totalTTC,
            };
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeServiceItem = (id: string) => {
    setServiceItems(serviceItems.filter((item) => item.id !== id));
  };

  const exportToPdf = async () => {
    if (documentRef.current) {
      toast({
        title: "Génération du PDF",
        description: "Veuillez patienter pendant la génération du PDF...",
      });

      try {
        // Create a PDF document
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true,
        });

        // Define PDF dimensions and margins
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 15; // 15mm margins on all sides

        // Get all sections
        const sections =
          documentRef.current.querySelectorAll(".contract-section");
        if (!sections || sections.length === 0) {
          throw new Error("Could not find document sections");
        }

        // Process each section
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];

          // Hide all sections except the current one
          Array.from(sections).forEach((s, index) => {
            if (index !== i) {
              (s as HTMLElement).style.display = "none";
            } else {
              (s as HTMLElement).style.display = "block";
            }
          });

          // Capture the current section
          const canvas = await html2canvas(section as HTMLElement, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: "#ffffff",
          });

          // Add section to PDF
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;

          // Calculate ratio while ensuring margins
          const availableWidth = pdfWidth - margin * 2;
          const availableHeight = pdfHeight - margin * 2;
          const imgRatio = Math.min(
            availableWidth / imgWidth,
            availableHeight / imgHeight
          );

          // Center the image with margins
          const imgX = margin + (availableWidth - imgWidth * imgRatio) / 2;
          const imgY = margin;

          // Add new page for sections after the first one
          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY,
            imgWidth * imgRatio,
            imgHeight * imgRatio
          );

          // Add page number
          pdf.setFontSize(8);
          pdf.setTextColor(150, 150, 150);
          pdf.text(
            `Page ${i + 1}/${sections.length}`,
            pdfWidth - 20,
            pdfHeight - 10
          );
        }

        // Restore display of all sections
        Array.from(sections).forEach((s) => {
          (s as HTMLElement).style.display = "block";
        });

        // Save the PDF
        pdf.save(`${contractInfo.reference}.pdf`);

        toast({
          title: "PDF généré avec succès",
          description: `Le PDF a été téléchargé (${sections.length} pages)`,
        });
      } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la génération du PDF.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center space-x-4">
          <Link href="/workspace" className="mr-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-500 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Workspace</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Contrat de Prestation</h1>
          <div className="ml-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Brouillon
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            onClick={async () => {
              console.log("Payload envoyé à Supabase :", contratDePrestation);

              const response = await fetch("/api/contrat-de-prestation", {
                method: "POST",
                body: JSON.stringify(contratDePrestation),
                headers: { "Content-Type": "application/json" },
              });

              if (response.ok) {
                toast({
                  title: "Contrat de prestation sauvegardé",
                  description: "Le document a été sauvegardé avec succès.",
                });
              } else {
                const error = await response.json();
                console.error("Erreur API Supabase :", error);
                toast({
                  title: "Erreur",
                  description: error.error || "Échec de la sauvegarde.",
                });
              }
            }}
          >
            <Save className="h-4 w-4" />
            <span>Sauvegarder</span>
          </Button>
          <Button
            size="sm"
            className="flex items-center space-x-2"
            onClick={exportToPdf}
          >
            <FileText className="h-4 w-4" />
            <span>Exporter PDF</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 flex-1 overflow-auto">
        {/* Preview Section */}
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 bg-background pb-2 mb-2 flex justify-between items-center">
            <h3 className="font-medium">Aperçu</h3>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              Document complet
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-2 shadow-inner overflow-y-auto">
            <ContratDePrestationPreview
              ref={documentRef}
              contratDePrestation={contratDePrestation}
            />
          </div>
        </div>

        {/* Editor Form */}
        <div className="overflow-y-auto border-l border-gray-200 pl-4">
          <ContratDePrestationForm
            contratDePrestation={contratDePrestation}
            setClientInfo={setClientInfo}
            setProviderInfo={setProviderInfo}
            setServiceItems={setServiceItems}
            setPaymentConditions={setPaymentConditions}
            setContractDuration={setContractDuration}
            setContractInfo={setContractInfo}
            addServiceItem={addServiceItem}
            updateServiceItem={updateServiceItem}
            removeServiceItem={removeServiceItem}
          />
        </div>
      </div>
    </div>
  );
}

export default ContratDePrestationEditor;
