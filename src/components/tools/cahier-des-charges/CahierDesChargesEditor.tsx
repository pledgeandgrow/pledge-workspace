"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, /* Download, */ FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { CahierDesChargesPreview } from "./CahierDesChargesPreview";
import { CahierDesChargesForm } from "./CahierDesChargesForm";
import {
  CahierDesCharges,
  ProjectInfo,
  ClientInfo,
  CompanyInfo,
  TeamMember,
  ProjectObjective,
  ProjectScope,
  Deliverable,
  Milestone,
  FunctionalRequirement,
  TechnicalRequirement,
  QualityRequirement,
  Budget,
  BudgetItem,
  Timeline,
  Risk,
  Approval,
  PaymentMilestone,
  TimelinePhase,
} from "./types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function CahierDesChargesEditor() {
  const { toast } = useToast();
  const documentRef = useRef<HTMLDivElement>(null);

  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
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
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Mehdi Berel",
      role: "Chef de Projet",
      email: "mehdi@pledgeandgrow.com",
      phone: "+33 7 53 69 58 40",
      responsibilities: "Coordination générale du projet",
    },
  ]);

  const [objectives, setObjectives] = useState<ProjectObjective[]>([
    {
      id: "1",
      title: "Objectif principal",
      description: "Description détaillée de l'objectif principal du projet.",
      priority: "high",
      measurableOutcome: "Critères de mesure du succès de l'objectif",
    },
  ]);

  const [scope, setScope] = useState<ProjectScope>({
    inScope: "Éléments inclus dans le périmètre du projet.",
    outOfScope: "Éléments explicitement exclus du périmètre du projet.",
    assumptions: "Hypothèses prises en compte pour la réalisation du projet.",
    constraints: "Contraintes techniques, budgétaires ou temporelles.",
    dependencies:
      "Dépendances externes nécessaires à la réalisation du projet.",
  });

  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    {
      id: "1",
      title: "Livrable principal",
      description: "Description détaillée du livrable.",
      format: "Format du livrable (document, logiciel, etc.)",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      acceptanceCriteria: "Critères d'acceptation du livrable",
    },
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "Jalon principal",
      description: "Description du jalon et de son importance.",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      deliverables: ["1"],
    },
  ]);

  const [functionalRequirements, setFunctionalRequirements] = useState<
    FunctionalRequirement[]
  >([
    {
      id: "1",
      category: "Fonctionnalité principale",
      title: "Exigence fonctionnelle",
      description: "Description détaillée de l'exigence fonctionnelle.",
      priority: "high",
      acceptanceCriteria: "Critères d'acceptation de la fonctionnalité",
    },
  ]);

  const [technicalRequirements, setTechnicalRequirements] = useState<
    TechnicalRequirement[]
  >([
    {
      id: "1",
      category: "Architecture",
      title: "Exigence technique",
      description: "Description détaillée de l'exigence technique.",
      priority: "high",
      implementation: "Détails d'implémentation technique",
    },
  ]);

  const [qualityRequirements, setQualityRequirements] = useState<
    QualityRequirement[]
  >([
    {
      id: "1",
      category: "performance",
      title: "Exigence de qualité",
      description: "Description détaillée de l'exigence de qualité.",
      measurementCriteria: "Critères de mesure de la qualité",
    },
  ]);

  const [budget, setBudget] = useState<Budget>({
    totalAmount: 10000,
    currency: "EUR",
    breakdown: [
      {
        id: "1",
        description: "Développement",
        amount: 7000,
        category: "Main d'œuvre",
      },
      {
        id: "2",
        description: "Licences logicielles",
        amount: 3000,
        category: "Matériel",
      },
    ],
    paymentSchedule: [
      {
        id: "1",
        description: "Acompte initial",
        amount: 3000,
        dueDate: new Date().toISOString().split("T")[0],
        conditions: "À la signature du contrat",
      },
      {
        id: "2",
        description: "Paiement intermédiaire",
        amount: 4000,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        conditions: "À la livraison du prototype",
      },
      {
        id: "3",
        description: "Paiement final",
        amount: 3000,
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        conditions: "À la livraison finale",
      },
    ],
    notes: "Notes supplémentaires concernant le budget.",
  });

  const [timeline, setTimeline] = useState<Timeline>({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    phases: [
      {
        id: "1",
        title: "Phase de conception",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        description: "Description de la phase de conception.",
        deliverables: ["1"],
      },
      {
        id: "2",
        title: "Phase de développement",
        startDate: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        description: "Description de la phase de développement.",
        deliverables: [],
      },
      {
        id: "3",
        title: "Phase de test et déploiement",
        startDate: new Date(Date.now() + 61 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        description: "Description de la phase de test et déploiement.",
        deliverables: [],
      },
    ],
    notes: "Notes supplémentaires concernant le calendrier.",
  });

  const [risks, setRisks] = useState<Risk[]>([
    {
      id: "1",
      description: "Description du risque principal.",
      impact: "high",
      probability: "medium",
      mitigation: "Stratégie de mitigation du risque.",
      contingency: "Plan de contingence en cas de réalisation du risque.",
      title: undefined,
    },
  ]);

  const [approval, setApproval] = useState<Approval>({
    clientName: "",
    clientTitle: "",
    clientSignatureDate: "",
    companyName: "PLEDGE AND GROW",
    companyTitle: "Directeur",
    companySignatureDate: "",
    notes: "Notes supplémentaires concernant l'approbation.",
  });

  const [appendices, setAppendices] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const initialProjectInfo: ProjectInfo = {
      title: "Cahier des Charges",
      reference: `CDC-${now.getFullYear()}-${String(
        Math.floor(Math.random() * 1000)
      ).padStart(3, "0")}`,
      date: now.toISOString().split("T")[0],
      version: "1.0",
      status: "draft",
      summary: "Description du projet et de ses objectifs généraux.",
    };

    setProjectInfo(initialProjectInfo);
  }, []);

  if (!projectInfo) {
    return null; // ou un spinner
  }

  const cahierDesCharges: CahierDesCharges = {
    projectInfo,
    clientInfo,
    companyInfo,
    teamMembers,
    objectives,
    scope,
    deliverables,
    milestones,
    functionalRequirements,
    technicalRequirements,
    qualityRequirements,
    budget,
    timeline,
    risks,
    approval,
    appendices,
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: `${teamMembers.length + 1}`,
      name: "",
      role: "",
      email: "",
      phone: "",
      responsibilities: "",
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const _updateTeamMember = (
    id: string,
    field: keyof TeamMember,
    value: string
  ) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const addObjective = () => {
    const newObjective: ProjectObjective = {
      id: `${objectives.length + 1}`,
      title: "",
      description: "",
      priority: "medium",
      measurableOutcome: "",
    };
    setObjectives([...objectives, newObjective]);
  };

  const _updateObjective = (
    id: string,
    field: keyof ProjectObjective,
    value: string | "high" | "medium" | "low"
  ) => {
    setObjectives(
      objectives.map((objective) =>
        objective.id === id ? { ...objective, [field]: value } : objective
      )
    );
  };

  const removeObjective = (id: string) => {
    setObjectives(objectives.filter((objective) => objective.id !== id));
  };

  const addDeliverable = () => {
    const newDeliverable: Deliverable = {
      id: `${deliverables.length + 1}`,
      title: "",
      description: "",
      format: "",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      acceptanceCriteria: "",
    };
    setDeliverables([...deliverables, newDeliverable]);
  };

  const _updateDeliverable = (
    id: string,
    field: keyof Deliverable,
    value: string
  ) => {
    setDeliverables(
      deliverables.map((deliverable) =>
        deliverable.id === id ? { ...deliverable, [field]: value } : deliverable
      )
    );
  };

  const removeDeliverable = (id: string) => {
    setDeliverables(
      deliverables.filter((deliverable) => deliverable.id !== id)
    );
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: `${milestones.length + 1}`,
      title: "",
      description: "",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      deliverables: [],
    };
    setMilestones([...milestones, newMilestone]);
  };

  const _updateMilestone = (
    id: string,
    field: keyof Milestone,
    value: string | string[]
  ) => {
    setMilestones(
      milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      )
    );
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id));
  };

  const addFunctionalRequirement = () => {
    const newRequirement: FunctionalRequirement = {
      id: `${functionalRequirements.length + 1}`,
      category: "",
      title: "",
      description: "",
      priority: "medium",
      acceptanceCriteria: "",
    };
    setFunctionalRequirements([...functionalRequirements, newRequirement]);
  };

  const _updateFunctionalRequirement = (
    id: string,
    field: keyof FunctionalRequirement,
    value: string | "critical" | "high" | "medium" | "low"
  ) => {
    setFunctionalRequirements(
      functionalRequirements.map((requirement) =>
        requirement.id === id ? { ...requirement, [field]: value } : requirement
      )
    );
  };

  const removeFunctionalRequirement = (id: string) => {
    setFunctionalRequirements(
      functionalRequirements.filter((requirement) => requirement.id !== id)
    );
  };

  const addTechnicalRequirement = () => {
    const newRequirement: TechnicalRequirement = {
      id: `${technicalRequirements.length + 1}`,
      category: "",
      title: "",
      description: "",
      priority: "medium",
      implementation: "",
    };
    setTechnicalRequirements([...technicalRequirements, newRequirement]);
  };

  const _updateTechnicalRequirement = (
    id: string,
    field: keyof TechnicalRequirement,
    value: string | "critical" | "high" | "medium" | "low"
  ) => {
    setTechnicalRequirements(
      technicalRequirements.map((requirement) =>
        requirement.id === id ? { ...requirement, [field]: value } : requirement
      )
    );
  };

  const removeTechnicalRequirement = (id: string) => {
    setTechnicalRequirements(
      technicalRequirements.filter((requirement) => requirement.id !== id)
    );
  };

  const addQualityRequirement = () => {
    const newRequirement: QualityRequirement = {
      id: `${qualityRequirements.length + 1}`,
      category: "performance",
      title: "",
      description: "",
      measurementCriteria: "",
    };
    setQualityRequirements([...qualityRequirements, newRequirement]);
  };

  const _updateQualityRequirement = (
    id: string,
    field: keyof QualityRequirement,
    value:
      | string
      | "performance"
      | "security"
      | "usability"
      | "reliability"
      | "maintainability"
      | "other"
  ) => {
    setQualityRequirements(
      qualityRequirements.map((requirement) =>
        requirement.id === id ? { ...requirement, [field]: value } : requirement
      )
    );
  };

  const removeQualityRequirement = (id: string) => {
    setQualityRequirements(
      qualityRequirements.filter((requirement) => requirement.id !== id)
    );
  };

  const addBudgetItem = () => {
    const newItem: BudgetItem = {
      id: `${budget.breakdown.length + 1}`,
      description: "",
      amount: 0,
      category: "",
    };
    setBudget({
      ...budget,
      breakdown: [...budget.breakdown, newItem],
    });
  };

  const _updateBudgetItem = (
    id: string,
    field: keyof BudgetItem,
    value: string | number
  ) => {
    setBudget({
      ...budget,
      breakdown: budget.breakdown.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeBudgetItem = (id: string) => {
    setBudget({
      ...budget,
      breakdown: budget.breakdown.filter((item) => item.id !== id),
    });
  };

  const addPaymentMilestone = () => {
    const newMilestone: PaymentMilestone = {
      id: `${budget.paymentSchedule.length + 1}`,
      description: "",
      amount: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      conditions: "",
    };
    setBudget({
      ...budget,
      paymentSchedule: [...budget.paymentSchedule, newMilestone],
    });
  };

  const _updatePaymentMilestone = (
    id: string,
    field: keyof PaymentMilestone,
    value: string | number
  ) => {
    setBudget({
      ...budget,
      paymentSchedule: budget.paymentSchedule.map((milestone) =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      ),
    });
  };

  const removePaymentMilestone = (id: string) => {
    setBudget({
      ...budget,
      paymentSchedule: budget.paymentSchedule.filter(
        (milestone) => milestone.id !== id
      ),
    });
  };

  const addTimelinePhase = () => {
    const newPhase: TimelinePhase = {
      id: `${timeline.phases.length + 1}`,
      title: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      description: "",
      deliverables: [],
    };
    setTimeline({
      ...timeline,
      phases: [...timeline.phases, newPhase],
    });
  };

  const _updateTimelinePhase = (
    id: string,
    field: keyof TimelinePhase,
    value: string | string[]
  ) => {
    setTimeline({
      ...timeline,
      phases: timeline.phases.map((phase) =>
        phase.id === id ? { ...phase, [field]: value } : phase
      ),
    });
  };

  const removeTimelinePhase = (id: string) => {
    setTimeline({
      ...timeline,
      phases: timeline.phases.filter((phase) => phase.id !== id),
    });
  };

  const addRisk = () => {
    const newRisk: Risk = {
      id: `${risks.length + 1}`,
      description: "",
      impact: "medium",
      probability: "medium",
      mitigation: "",
      contingency: "",
      title: undefined,
    };
    setRisks([...risks, newRisk]);
  };

  const _updateRisk = (
    id: string,
    field: keyof Risk,
    value: string | "high" | "medium" | "low"
  ) => {
    setRisks(
      risks.map((risk) => (risk.id === id ? { ...risk, [field]: value } : risk))
    );
  };

  const removeRisk = (id: string) => {
    setRisks(risks.filter((risk) => risk.id !== id));
  };

  const calculateTotalBudget = () => {
    return budget.breakdown.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotalPayments = () => {
    return budget.paymentSchedule.reduce(
      (sum, milestone) => sum + milestone.amount,
      0
    );
  };

  const exportToPdf = async () => {
    if (documentRef.current) {
      console.log("Document found:", documentRef.current); // Vérifie que le DOM est bien référencé
      const sections = documentRef.current.querySelectorAll(".cdc-section");
      console.log("Sections found:", sections); // Vérifie que les sections sont trouvées
      if (!sections || sections.length === 0) {
        console.error("Could not find document sections");
        return;
      }
    } else {
      console.error("documentRef.current is null");
    }

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
        const sections = documentRef.current.querySelectorAll(".cdc-section");
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
        pdf.save(`${projectInfo.reference}.pdf`);

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

  function updateApproval(field: keyof Approval, value: string): void {
    throw new Error("Function not implemented.");
  }

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
          <h1 className="text-2xl font-bold">Cahier des Charges</h1>
          <div className="ml-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                projectInfo.status === "draft"
                  ? "bg-gray-100 text-gray-800"
                  : projectInfo.status === "review"
                  ? "bg-blue-100 text-blue-800"
                  : projectInfo.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : projectInfo.status === "completed"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {projectInfo.status === "draft"
                ? "Brouillon"
                : projectInfo.status === "review"
                ? "En revue"
                : projectInfo.status === "approved"
                ? "Approuvé"
                : projectInfo.status === "completed"
                ? "Complété"
                : "Brouillon"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            onClick={async () => {
              console.log("Payload envoyé à Supabase :", cahierDesCharges); // 👈 important
            
              const response = await fetch("/api/cahier-des-charges", {
                method: "POST",
                body: JSON.stringify(cahierDesCharges),
                headers: { "Content-Type": "application/json" },
              });
            
              if (response.ok) {
                toast({ title: "Cahier des charges sauvegardé", description: "Le document a été sauvegardé avec succès." });
              } else {
                const error = await response.json(); // 👈 affiche l’erreur exacte
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
            <CahierDesChargesPreview
              ref={documentRef}
              cahierDesCharges={cahierDesCharges}
            />
          </div>
        </div>

        {/* Editor Form */}
        <div className="overflow-y-auto border-l border-gray-200 pl-4">
          <CahierDesChargesForm
            cahierDesCharges={cahierDesCharges}
            setProjectInfo={setProjectInfo}
            setClientInfo={setClientInfo}
            setCompanyInfo={setCompanyInfo}
            setTeamMembers={setTeamMembers}
            setObjectives={setObjectives}
            setScope={setScope}
            setDeliverables={setDeliverables}
            setMilestones={setMilestones}
            setFunctionalRequirements={setFunctionalRequirements}
            setTechnicalRequirements={setTechnicalRequirements}
            setQualityRequirements={setQualityRequirements}
            setBudget={setBudget}
            setTimeline={setTimeline}
            setRisks={setRisks}
            setApproval={setApproval}
            setAppendices={setAppendices}
            addTeamMember={addTeamMember}
            _updateTeamMember={_updateTeamMember}
            removeTeamMember={removeTeamMember}
            addObjective={addObjective}
            _updateObjective={_updateObjective}
            removeObjective={removeObjective}
            addDeliverable={addDeliverable}
            _updateDeliverable={_updateDeliverable}
            removeDeliverable={removeDeliverable}
            addMilestone={addMilestone}
            _updateMilestone={_updateMilestone}
            removeMilestone={removeMilestone}
            addFunctionalRequirement={addFunctionalRequirement}
            _updateFunctionalRequirement={_updateFunctionalRequirement}
            removeFunctionalRequirement={removeFunctionalRequirement}
            addTechnicalRequirement={addTechnicalRequirement}
            _updateTechnicalRequirement={_updateTechnicalRequirement}
            removeTechnicalRequirement={removeTechnicalRequirement}
            addQualityRequirement={addQualityRequirement}
            _updateQualityRequirement={_updateQualityRequirement}
            removeQualityRequirement={removeQualityRequirement}
            addBudgetItem={addBudgetItem}
            _updateBudgetItem={_updateBudgetItem}
            removeBudgetItem={removeBudgetItem}
            addPaymentMilestone={addPaymentMilestone}
            _updatePaymentMilestone={_updatePaymentMilestone}
            removePaymentMilestone={removePaymentMilestone}
            addTimelinePhase={addTimelinePhase}
            _updateTimelinePhase={_updateTimelinePhase}
            removeTimelinePhase={removeTimelinePhase}
            addRisk={addRisk}
            _updateRisk={_updateRisk}
            removeRisk={removeRisk}
            calculateTotalBudget={calculateTotalBudget}
            calculateTotalPayments={calculateTotalPayments}
            // il n y a pas de updateTimeline
            // updateTimeline={updateTimeline}
            // Property '_updateTimeline' is missing in type
            _updateTimeline={function (
              field: keyof Timeline,
              value: string | Date
            ): void {
              throw new Error("Function not implemented.");
            }}
            updateApproval={updateApproval}
          />
        </div>
      </div>
    </div>
  );
}

export default CahierDesChargesEditor;
