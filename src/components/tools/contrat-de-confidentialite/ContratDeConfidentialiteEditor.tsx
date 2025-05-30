"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Save, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ContratDeConfidentialitePreview } from "./ContratDeConfidentialitePreview";
import { ContratDeConfidentialiteForm } from "./ContratDeConfidentialiteForm";
import { 
  ContratDeConfidentialite,
  PartyInfo,
  ConfidentialityScope,
  Obligations,
  LegalTerms
} from "./types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function ContratDeConfidentialiteEditor() {
  const { toast } = useToast();
  const documentRef = useRef<HTMLDivElement>(null);
  
  // Initialize with default values
  const [disclosingParty, setDisclosingParty] = useState<PartyInfo>({
    type: "company",
    name: "PLEDGE AND GROW",
    address: "4bis Rue Alfred Nobel",
    postalCode: "77420",
    city: "Champs-sur-marne",
    country: "France",
    email: "contact@pledgeandgrow.com",
    phone: "+33 7 53 69 58 40",
    representative: "Mehdi Berel",
    representativeTitle: "Directeur",
    siret: "93157766200014"
  });

  const [receivingParty, setReceivingParty] = useState<PartyInfo>({
    type: "company",
    name: "",
    address: "",
    postalCode: "",
    city: "",
    country: "France",
    email: "",
    phone: "",
    representative: "",
    representativeTitle: "",
    siret: ""
  });

  const [reciprocal, setReciprocal] = useState<boolean>(false);

  const [scope, setScope] = useState<ConfidentialityScope>({
    purpose: "Évaluation d'une potentielle collaboration commerciale",
    confidentialInfoDescription: "Toute information technique, commerciale, financière, juridique ou autre, quelle que soit sa nature, sa forme ou son support, divulguée par une Partie à l'autre, directement ou indirectement, par écrit ou oralement, et désignée comme confidentielle par la Partie divulgatrice.",
    excludedInfo: "Les informations qui sont ou deviennent publiques sans faute du Récepteur, les informations déjà connues du Récepteur avant la divulgation, les informations développées indépendamment par le Récepteur, et les informations que le Récepteur est légalement tenu de divulguer.",
    duration: {
      value: 3,
      unit: "years"
    },
    startDate: new Date().toISOString().split('T')[0],
    territorialScope: "France et international"
  });

  const [obligations, setObligations] = useState<Obligations>({
    disclosureRestrictions: "Le Récepteur s'engage à ne pas divulguer les Informations Confidentielles à des tiers sans l'accord préalable écrit de la Partie divulgatrice.",
    protectionMeasures: "Le Récepteur s'engage à protéger les Informations Confidentielles avec le même degré de précaution qu'il utilise pour protéger ses propres informations confidentielles, et au minimum avec un degré de précaution raisonnable.",
    returnOfInfo: "À la demande de la Partie divulgatrice, ou à la fin de l'objet pour lequel les Informations Confidentielles ont été divulguées, le Récepteur s'engage à retourner ou détruire toutes les Informations Confidentielles et leurs copies.",
    notificationRequirements: "Le Récepteur s'engage à informer immédiatement la Partie divulgatrice de toute divulgation non autorisée d'Informations Confidentielles dont il aurait connaissance."
  });

  const [legalTerms, setLegalTerms] = useState<LegalTerms>({
    applicableLaw: "Le présent contrat est soumis au droit français.",
    disputeResolution: "Tout litige relatif à l'interprétation ou à l'exécution du présent contrat sera soumis aux tribunaux compétents de Paris.",
    penalties: "Toute violation des obligations de confidentialité pourra donner lieu à des dommages et intérêts.",
    forceMajeure: "Aucune Partie ne sera tenue responsable de la non-exécution de ses obligations en cas de force majeure.",
    entireAgreement: "Le présent contrat constitue l'intégralité de l'accord entre les Parties concernant l'objet des présentes et remplace tout accord ou arrangement antérieur.",
    amendments: "Toute modification du présent contrat devra faire l'objet d'un avenant écrit signé par les deux Parties.",
    severability: "Si une disposition du présent contrat est jugée invalide ou inapplicable, les autres dispositions resteront en vigueur.",
    additionalClauses: ""
  });

  // Generate a reference number for the contract
  const reference = `NDA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  const date = new Date().toISOString().split('T')[0];

  const contratDeConfidentialite: ContratDeConfidentialite = {
    reference,
    date,
    disclosingParty,
    receivingParty,
    reciprocal,
    scope,
    obligations,
    legalTerms
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
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });
        
        // Define PDF dimensions and margins
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 15; // 15mm margins on all sides
        
        // Get all sections
        const sections = documentRef.current.querySelectorAll('.nda-section');
        if (!sections || sections.length === 0) {
          throw new Error("Could not find document sections");
        }
        
        // Process each section
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          
          // Hide all sections except the current one
          Array.from(sections).forEach((s, index) => {
            if (index !== i) {
              (s as HTMLElement).style.display = 'none';
            } else {
              (s as HTMLElement).style.display = 'block';
            }
          });
          
          // Capture the current section
          const canvas = await html2canvas(section as HTMLElement, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: "#ffffff"
          });
          
          // Add section to PDF
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          
          // Calculate ratio while ensuring margins
          const availableWidth = pdfWidth - (margin * 2);
          const availableHeight = pdfHeight - (margin * 2);
          const imgRatio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
          
          // Center the image with margins
          const imgX = margin + (availableWidth - imgWidth * imgRatio) / 2;
          const imgY = margin;
          
          // Add new page for sections after the first one
          if (i > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * imgRatio, imgHeight * imgRatio);
          
          // Add page number
          pdf.setFontSize(8);
          pdf.setTextColor(150, 150, 150);
          pdf.text(`Page ${i + 1}/${sections.length}`, pdfWidth - 20, pdfHeight - 10);
        }
        
        // Restore display of all sections
        Array.from(sections).forEach((s) => {
          (s as HTMLElement).style.display = 'block';
        });
        
        // Save the PDF
        pdf.save(`${reference}.pdf`);
        
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
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              <span>Workspace</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Contrat de Confidentialité</h1>
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
            onClick={() => {
              // Save functionality would go here
              toast({
                title: "Contrat sauvegardé",
                description: "Le contrat a été sauvegardé avec succès.",
              });
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
            <ContratDeConfidentialitePreview
              ref={documentRef}
              contratDeConfidentialite={contratDeConfidentialite}
            />
          </div>
        </div>

        {/* Editor Form */}
        <div className="overflow-y-auto border-l border-gray-200 pl-4">
          <ContratDeConfidentialiteForm
            contratDeConfidentialite={contratDeConfidentialite}
            setDisclosingParty={setDisclosingParty}
            setReceivingParty={setReceivingParty}
            setReciprocal={setReciprocal}
            setScope={setScope}
            setObligations={setObligations}
            setLegalTerms={setLegalTerms}
          />
        </div>
      </div>
    </div>
  );
}

export default ContratDeConfidentialiteEditor;
