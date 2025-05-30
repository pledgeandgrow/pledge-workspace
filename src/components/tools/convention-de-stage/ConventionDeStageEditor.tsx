"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Save, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ConventionDeStagePreview } from "./ConventionDeStagePreview";
import { ConventionDeStageForm } from "./ConventionDeStageForm";
import { 
  ConventionDeStage,
  StudentInfo,
  CompanyInfo,
  SupervisorInfo,
  InternshipInfo,
  EducationalInfo
} from "./types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function ConventionDeStageEditor() {
  const { toast } = useToast();
  const documentRef = useRef<HTMLDivElement>(null);
  
  // Initialize with default values
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "Française",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    studyLevel: "",
    institution: ""
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "PLEDGE AND GROW",
    address: "4bis Rue Alfred Nobel",
    postalCode: "77420",
    city: "Champs-sur-marne",
    country: "France",
    siret: "93157766200014",
    activityCode: "6201Z",
    representative: {
      firstName: "Mehdi",
      lastName: "Berel",
      title: "Directeur",
      email: "contact@pledgeandgrow.com",
      phone: "+33 7 53 69 58 40"
    }
  });

  const [companySupervisor, setCompanySupervisor] = useState<SupervisorInfo>({
    firstName: "Mehdi",
    lastName: "Berel",
    title: "Directeur",
    email: "contact@pledgeandgrow.com",
    phone: "+33 7 53 69 58 40"
  });

  const [internshipInfo, setInternshipInfo] = useState<InternshipInfo>({
    startDate: "",
    endDate: "",
    duration: "",
    hoursPerWeek: 35,
    schedule: "Du lundi au vendredi, de 9h à 17h",
    location: "4bis Rue Alfred Nobel, 77420 Champs-sur-marne",
    department: "Développement",
    subject: "Développement web",
    description: "Stage de développement web dans le cadre de la formation",
    tasks: "Développement d'applications web, intégration de maquettes, tests et débogage",
    skills: "HTML, CSS, JavaScript, React, Node.js",
    compensation: {
      amount: 600,
      frequency: "monthly",
      benefits: "Tickets restaurant"
    },
    holidays: "Selon la politique de l'entreprise"
  });

  const [educationalInfo, setEducationalInfo] = useState<EducationalInfo>({
    institution: {
      name: "",
      address: "",
      postalCode: "",
      city: "",
      country: "France",
      representative: {
        firstName: "",
        lastName: "",
        title: "Directeur",
        email: "",
        phone: ""
      }
    },
    supervisor: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: ""
    },
    program: "",
    year: "",
    objectives: "Acquérir une expérience professionnelle dans le domaine du développement web",
    evaluation: "Rapport de stage et évaluation par le maître de stage"
  });

  const [additionalClauses, setAdditionalClauses] = useState<string>(
    "L'étudiant s'engage à respecter le règlement intérieur de l'entreprise et à maintenir la confidentialité des informations auxquelles il aura accès."
  );

  const [signatures, setSignatures] = useState({
    student: false,
    company: false,
    institution: false,
    date: new Date().toISOString().split('T')[0]
  });

  // Generate a reference number for the convention
  const reference = `STAGE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  const date = new Date().toISOString().split('T')[0];

  const conventionDeStage: ConventionDeStage = {
    reference,
    date,
    studentInfo,
    companyInfo,
    companySupervisor,
    internshipInfo,
    educationalInfo,
    additionalClauses,
    signatures
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
        const sections = documentRef.current.querySelectorAll('.convention-section');
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
          <h1 className="text-2xl font-bold">Convention de Stage</h1>
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
                title: "Convention sauvegardée",
                description: "La convention a été sauvegardée avec succès.",
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
            <ConventionDeStagePreview
              ref={documentRef}
              conventionDeStage={conventionDeStage}
            />
          </div>
        </div>

        {/* Editor Form */}
        <div className="overflow-y-auto border-l border-gray-200 pl-4">
          <ConventionDeStageForm
            conventionDeStage={conventionDeStage}
            onStudentInfoChange={setStudentInfo}
            onCompanyInfoChange={setCompanyInfo}
            onCompanySupervisorChange={setCompanySupervisor}
            onInternshipInfoChange={setInternshipInfo}
            onEducationalInfoChange={setEducationalInfo}
            onAdditionalClausesChange={setAdditionalClauses}
            onSignaturesChange={setSignatures}
          />
        </div>
      </div>
    </div>
  );
}

export default ConventionDeStageEditor;
