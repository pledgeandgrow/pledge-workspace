"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Save, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { DevisPreview } from "./DevisPreview";
import { DevisForm } from "./DevisForm";
import { ClientInfo, EstimateInfo, EstimateItem, CompanyInfo } from "./types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function DevisEditor() {
  const { toast } = useToast();
  const documentRef = useRef<HTMLDivElement>(null);

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "",
    address: "",
    email: "",
    phone: "",
    country: "France",
    isCompany: false,
    companyName: "",
    vatNumber: "",
    registrationNumber: "",
    contactPerson: "",
    website: "",
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "PLEDGE AND GROW",
    contactName: "Mehdi Berel",
    address: "4bis Rue Alfred Nobel",
    zipCity: "77420 Champs-sur-marne",
    country: "France",
    companyNumber: "93157766200014",
    activityCode: "6201Z",
    vatNumber: "FR38931577662",
    phone: "+33 7 53 69 58 40",
    email: "contact@pledgeandgrow.com",
    website: "https://www.pledgeandgrow.com/",
    description: "Digitalisation de projets informatiques.",
    iban: "FR76 3000 3041 2100 0207 5312 595",
    bic: "SOGEFRPP",
  });

  const [estimateInfo, setEstimateInfo] = useState<EstimateInfo>({
    title: "Devis Provisoire",
    number: `EST-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`,
    date: new Date().toISOString().split("T")[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    notes: "",
    paymentTerms: "120 jours",
    paymentMethod: "Virement bancaire",
    validity: "120 jours",
    termsAndConditions:
      "Les présentes conditions générales de vente s'appliquent à toutes les prestations de services conclues par le prestataire auprès des clients, quelles que soient les clauses pouvant figurer sur les documents du client, et notamment ses conditions générales d'achat.",
  });
  

  const [items, setItems] = useState<EstimateItem[]>([
    {
      id: "1",
      type: "Service",
      description: "Développement d'un site e-commerce Shopify.",
      quantity: 1,
      unitPrice: 1250.0,
      tax: 20,
    },
  ]);

  const addItem = () => {
    const newItem: EstimateItem = {
      id: `${items.length + 1}`,
      type: "Service",
      description: "",
      quantity: 1,
      unitPrice: 0,
      tax: 20,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (
    id: string,
    field: keyof EstimateItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const calculateTax = () => {
    return items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice * (item.tax / 100),
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
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

        // First page - Main content
        const mainContent = documentRef.current.querySelector(".main-content");
        if (!mainContent) {
          throw new Error("Could not find main content element");
        }

        // Only proceed with second page if terms and conditions exist
        const hasTerms =
          estimateInfo.termsAndConditions &&
          estimateInfo.termsAndConditions.trim().length > 0;
        const totalPages = hasTerms ? 2 : 1;

        // Hide terms content when capturing main content
        const termsSection =
          documentRef.current.querySelector(".terms-content");
        if (termsSection) {
          termsSection.classList.add("hidden");
        }

        const mainCanvas = await html2canvas(mainContent as HTMLElement, {
          scale: 2,
          logging: false,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        // Show terms content again
        if (termsSection) {
          termsSection.classList.remove("hidden");
        }

        // Add main content to first page
        const mainImgData = mainCanvas.toDataURL("image/png");
        const mainImgWidth = mainCanvas.width;
        const mainImgHeight = mainCanvas.height;

        // Calculate ratio while ensuring margins
        const availableWidth = pdfWidth - margin * 2;
        const availableHeight = pdfHeight - margin * 2;
        const mainRatio = Math.min(
          availableWidth / mainImgWidth,
          availableHeight / mainImgHeight
        );

        // Center the image with margins
        const mainImgX =
          margin + (availableWidth - mainImgWidth * mainRatio) / 2;
        const mainImgY = margin;

        pdf.addImage(
          mainImgData,
          "PNG",
          mainImgX,
          mainImgY,
          mainImgWidth * mainRatio,
          mainImgHeight * mainRatio
        );

        // Add page number to first page
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page 1/${totalPages}`, pdfWidth - 20, pdfHeight - 10);

        // Second page - Terms and conditions (only if they exist)
        if (hasTerms) {
          pdf.addPage();

          // Hide main content when capturing terms content
          mainContent.classList.add("hidden");

          // Create a container for terms with proper styling
          const termsContainer = document.createElement("div");
          termsContainer.className = "terms-container bg-white p-10";
          termsContainer.style.width = "210mm"; // A4 width
          termsContainer.style.height = "297mm"; // A4 height
          termsContainer.style.margin = "0 auto";
          termsContainer.style.color = "black";
          termsContainer.style.position = "relative";

          // Add title
          const termsTitle = document.createElement("h2");
          termsTitle.className = "text-xl font-bold text-center mb-6";
          termsTitle.textContent = "Conditions générales de vente";
          termsContainer.appendChild(termsTitle);

          // Add content
          const termsText = document.createElement("p");
          termsText.className = "text-sm whitespace-pre-wrap";
          termsText.textContent = estimateInfo.termsAndConditions;
          termsContainer.appendChild(termsText);

          // Append to body temporarily
          document.body.appendChild(termsContainer);

          // Capture terms content
          const termsCanvas = await html2canvas(termsContainer, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: "#ffffff",
          });

          // Remove temporary container
          document.body.removeChild(termsContainer);

          // Show main content again
          mainContent.classList.remove("hidden");

          // Add terms content to second page
          const termsImgData = termsCanvas.toDataURL("image/png");
          const termsImgWidth = termsCanvas.width;
          const termsImgHeight = termsCanvas.height;

          const termsRatio = Math.min(
            availableWidth / termsImgWidth,
            availableHeight / termsImgHeight
          );
          const termsImgX =
            margin + (availableWidth - termsImgWidth * termsRatio) / 2;
          const termsImgY = margin;

          pdf.addImage(
            termsImgData,
            "PNG",
            termsImgX,
            termsImgY,
            termsImgWidth * termsRatio,
            termsImgHeight * termsRatio
          );

          // Add page number to second page
          pdf.setFontSize(8);
          pdf.setTextColor(150, 150, 150);
          pdf.text(`Page 2/${totalPages}`, pdfWidth - 20, pdfHeight - 10);
        }

        // Save the PDF
        pdf.save(`devis-${estimateInfo.number}.pdf`);

        toast({
          title: "PDF généré avec succès",
          description: `Le PDF a été téléchargé (${totalPages} page${
            totalPages > 1 ? "s" : ""
          })`,
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
          <h1 className="text-2xl font-bold">Devis</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            onClick={async () => {
              console.log("Payload envoyé à Supabase :", estimateInfo);

              const response = await fetch("/api/devis", {
                method: "POST",
                body: JSON.stringify(estimateInfo),
                headers: { "Content-Type": "application/json" },
              });

              if (response.ok) {
                toast({
                  title: "Devis sauvegardé",
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
        {/* Preview Section with improved UX */}
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 bg-background pb-2 mb-2 flex justify-between items-center">
            <h3 className="font-medium">Aperçu</h3>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              {estimateInfo.termsAndConditions &&
              estimateInfo.termsAndConditions.trim().length > 0
                ? "2 pages"
                : "1 page"}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-2 shadow-inner overflow-y-auto">
            <DevisPreview
              ref={documentRef}
              clientInfo={clientInfo}
              estimateInfo={estimateInfo}
              items={items}
              companyInfo={companyInfo}
              calculateSubtotal={calculateSubtotal}
              calculateTax={calculateTax}
              calculateTotal={calculateTotal}
            />
          </div>
        </div>

        {/* Editor Form */}
        <div className="overflow-y-auto border-l border-gray-200 pl-4">
          <DevisForm
            clientInfo={clientInfo}
            setClientInfo={setClientInfo}
            estimateInfo={estimateInfo}
            setEstimateInfo={setEstimateInfo}
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
            items={items}
            setItems={setItems}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
            calculateSubtotal={calculateSubtotal}
            calculateTax={calculateTax}
            calculateTotal={calculateTotal}
          />
        </div>
      </div>
    </div>
  );
}

export default DevisEditor;
