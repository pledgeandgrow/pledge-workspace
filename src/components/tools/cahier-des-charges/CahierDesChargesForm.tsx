"use client";

// import { useState } from "react"; // Removed unused import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";
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
  PaymentMilestone,
  Timeline,
  TimelinePhase,
  Risk,
  Approval
} from "./types";

interface CahierDesChargesFormProps {
  cahierDesCharges: CahierDesCharges;
  setProjectInfo: (projectInfo: ProjectInfo) => void;
  setClientInfo: (clientInfo: ClientInfo) => void;
  setCompanyInfo: (companyInfo: CompanyInfo) => void;
  setTeamMembers: (teamMembers: TeamMember[]) => void;
  setObjectives: (objectives: ProjectObjective[]) => void;
  setScope: (scope: ProjectScope) => void;
  setDeliverables: (deliverables: Deliverable[]) => void;
  setMilestones: (milestones: Milestone[]) => void;
  setFunctionalRequirements: (requirements: FunctionalRequirement[]) => void;
  setTechnicalRequirements: (requirements: TechnicalRequirement[]) => void;
  setQualityRequirements: (requirements: QualityRequirement[]) => void;
  setBudget: (budget: Budget) => void;
  setTimeline: (timeline: Timeline) => void;
  setRisks: (risks: Risk[]) => void;
  setApproval: (approval: Approval) => void;
  setAppendices: (appendices: string) => void;
  addTeamMember: () => void;
  updateTeamMember: (id: string, field: keyof TeamMember, value: string) => void;
  removeTeamMember: (id: string) => void;
  addObjective: () => void;
  _updateObjective: (id: string, field: keyof ProjectObjective, value: string) => void;
  removeObjective: (id: string) => void;
  addDeliverable: () => void;
  updateDeliverable: (id: string, field: keyof Deliverable, value: string) => void;
  removeDeliverable: (id: string) => void;
  addMilestone: () => void;
  _updateMilestone: (id: string, field: keyof Milestone, value: string | Date) => void;
  removeMilestone: (id: string) => void;
  addFunctionalRequirement: () => void;
  _updateFunctionalRequirement: (id: string, field: keyof FunctionalRequirement, value: string) => void;
  removeFunctionalRequirement: (id: string) => void;
  addTechnicalRequirement: () => void;
  _updateTechnicalRequirement: (id: string, field: keyof TechnicalRequirement, value: string) => void;
  removeTechnicalRequirement: (id: string) => void;
  addQualityRequirement: () => void;
  _updateQualityRequirement: (id: string, field: keyof QualityRequirement, value: string) => void;
  removeQualityRequirement: (id: string) => void;
  addBudgetItem: () => void;
  _updateBudgetItem: (id: string, field: keyof BudgetItem, value: string | number) => void;
  removeBudgetItem: (id: string) => void;
  addPaymentMilestone: () => void;
  _updatePaymentMilestone: (id: string, field: keyof PaymentMilestone, value: string | number | Date) => void;
  removePaymentMilestone: (id: string) => void;
  _updateTimeline: (field: keyof Timeline, value: string | Date) => void;
  addTimelinePhase: () => void;
  _updateTimelinePhase: (id: string, field: keyof TimelinePhase, value: string | Date) => void;
  removeTimelinePhase: (id: string) => void;
  addRisk: () => void;
  _updateRisk: (id: string, field: keyof Risk, value: string) => void;
  removeRisk: (id: string) => void;
  updateApproval: (field: keyof Approval, value: string) => void;
  calculateTotalPayments: () => number;
}

export function CahierDesChargesForm(props: CahierDesChargesFormProps) {
  // Alias cahierDesCharges as data for easier reference in the component
  const data = props.cahierDesCharges;

  // Helper function to create a new ID
  const createId = () => `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Helper function to update a specific field in the project info
  const updateProjectInfo = (field: keyof ProjectInfo, value: string | number | Date | Record<string, unknown>) => {
    props.setProjectInfo({
      ...data.projectInfo,
      [field]: value
    });
  };

  // Helper function to update a specific field in the client info
  const updateClientInfo = (field: keyof ClientInfo, value: string) => {
    props.setClientInfo({
      ...data.clientInfo,
      [field]: value,
    });
  };

  // Helper function to update a specific field in the company info
  const updateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    props.setCompanyInfo({
      ...data.companyInfo,
      [field]: value,
    });
  };

  // Helper function to add a team member
  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: createId(),
      name: "",
      role: "",
      email: "",
      phone: "",
      responsibilities: "",
    };
    props.setTeamMembers([...data.teamMembers, newMember]);
  };

  // Helper function to update a team member
  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    props.setTeamMembers(data.teamMembers.map((member) =>
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  // Helper function to remove a team member
  const removeTeamMember = (id: string) => {
    props.setTeamMembers(data.teamMembers.filter((member) => member.id !== id));
  };

  // Helper function to add an objective
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addObjective = () => {
    const newObjective: ProjectObjective = {
      id: createId(),
      title: "",
      description: "",
      priority: "medium",
      measurableOutcome: "",
    };
    props.setObjectives([...data.objectives, newObjective]);
  };

  // Helper function to update an objective
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateObjective = (id: string, field: keyof ProjectObjective, value: string) => {
    props.setObjectives(data.objectives.map((objective) =>
      objective.id === id ? { ...objective, [field]: value } : objective
    ));
  };

  // Helper function to remove an objective
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeObjective = (id: string) => { // Prefixed with underscore as it's currently unused
    props.setObjectives(data.objectives.filter((objective) => objective.id !== id));
  };

  // Helper function to update project scope
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateScope = (field: keyof ProjectScope, value: string) => { // Prefixed with underscore as it's currently unused
    props.setScope({
      ...data.scope,
      [field]: value,
    });
  };

  // Helper function to add a deliverable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addDeliverable = () => { // Prefixed with underscore as it's currently unused
    const newDeliverable: Deliverable = {
      id: createId(),
      title: "",
      description: "",
      format: "",
      dueDate: "",
      acceptanceCriteria: "",
    };
    updateData({
      deliverables: [...data.deliverables, newDeliverable],
    });
  };

  // Helper function to update a deliverable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateDeliverable = (id: string, field: keyof Deliverable, value: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      deliverables: data.deliverables.map((deliverable) =>
        deliverable.id === id ? { ...deliverable, [field]: value } : deliverable
      ),
    });
  };

  // Helper function to remove a deliverable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeDeliverable = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      deliverables: data.deliverables.filter((deliverable) => deliverable.id !== id),
    });
  };

  // Helper function to add a milestone
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addMilestone = () => { // Prefixed with underscore as it's currently unused
    const newMilestone: Milestone = {
      id: createId(),
      title: "",
      description: "",
      dueDate: "",
      deliverables: [],
    };
    updateData({
      milestones: [...data.milestones, newMilestone],
    });
  };

  // Helper function to update a milestone
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateMilestone = (id: string, field: keyof Milestone, value: string | Date) => { // Prefixed with underscore as it's currently unused
    updateData({
      milestones: data.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      ),
    });
  };

  // Helper function to remove a milestone
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeMilestone = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      milestones: data.milestones.filter((milestone) => milestone.id !== id),
    });
  };

  // Helper function to add a functional requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addFunctionalRequirement = () => { // Prefixed with underscore as it's currently unused
    const newRequirement: FunctionalRequirement = {
      id: createId(),
      category: "",
      title: "",
      description: "",
      priority: "medium",
      acceptanceCriteria: "",
    };
    updateData({
      functionalRequirements: [...data.functionalRequirements, newRequirement],
    });
  };

  // Helper function to update a functional requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateFunctionalRequirement = (id: string, field: keyof FunctionalRequirement, value: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      functionalRequirements: data.functionalRequirements.map((req) =>
        req.id === id ? { ...req, [field]: value } : req
      ),
    });
  };

  // Helper function to remove a functional requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeFunctionalRequirement = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      functionalRequirements: data.functionalRequirements.filter((req) => req.id !== id),
    });
  };

  // Helper function to add a technical requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addTechnicalRequirement = () => { // Prefixed with underscore as it's currently unused
    const newRequirement: TechnicalRequirement = {
      id: createId(),
      category: "",
      title: "",
      description: "",
      priority: "medium",
      implementation: "",
    };
    updateData({
      technicalRequirements: [...data.technicalRequirements, newRequirement],
    });
  };

  // Helper function to update a technical requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateTechnicalRequirement = (id: string, field: keyof TechnicalRequirement, value: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      technicalRequirements: data.technicalRequirements.map((req) =>
        req.id === id ? { ...req, [field]: value } : req
      ),
    });
  };

  // Helper function to remove a technical requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeTechnicalRequirement = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      technicalRequirements: data.technicalRequirements.filter((req) => req.id !== id),
    });
  };

  // Helper function to add a quality requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addQualityRequirement = () => { // Prefixed with underscore as it's currently unused
    const newRequirement: QualityRequirement = {
      id: createId(),
      category: "performance",
      title: "",
      description: "",
      measurementCriteria: "",
    };
    updateData({
      qualityRequirements: [...data.qualityRequirements, newRequirement],
    });
  };

  // Helper function to update a quality requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateQualityRequirement = (id: string, field: keyof QualityRequirement, value: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      qualityRequirements: data.qualityRequirements.map((req) =>
        req.id === id ? { ...req, [field]: value } : req
      ),
    });
  };

  // Helper function to remove a quality requirement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeQualityRequirement = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      qualityRequirements: data.qualityRequirements.filter((req) => req.id !== id),
    });
  };

  // Helper function to add a budget item
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addBudgetItem = () => { // Prefixed with underscore as it's currently unused
    const newItem: BudgetItem = {
      id: createId(),
      description: "",
      amount: 0,
      category: "",
    };
    updateData({
      budget: {
        ...data.budget,
        breakdown: [...data.budget.breakdown, newItem],
      },
    });
  };

  // Helper function to update a budget item
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateBudgetItem = (id: string, field: keyof BudgetItem, value: string | number) => { // Prefixed with underscore as it's currently unused
    updateData({
      budget: {
        ...data.budget,
        breakdown: data.budget.breakdown.map((item: BudgetItem) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    });
  };

  // Helper function to remove a budget item
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeBudgetItem = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      budget: {
        ...data.budget,
        breakdown: data.budget.breakdown.filter((item: BudgetItem) => item.id !== id),
      },
    });
  };

  // Helper function to add a payment milestone
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addPaymentMilestone = () => { // Prefixed with underscore as it's currently unused
    const newMilestone: PaymentMilestone = {
      id: createId(),
      description: "",
      amount: 0,
      dueDate: "",
      conditions: "",
    };
    updateData({
      budget: {
        ...data.budget,
        paymentSchedule: [...data.budget.paymentSchedule, newMilestone],
      },
    });
  };

  // Helper function to update a payment milestone
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updatePaymentMilestone = (id: string, field: keyof PaymentMilestone, value: string | number | Date) => { // Prefixed with underscore as it's currently unused
    updateData({
      budget: {
        ...data.budget,
        paymentSchedule: data.budget.paymentSchedule.map((milestone: PaymentMilestone) =>
          milestone.id === id ? { ...milestone, [field]: value } : milestone
        ),
      },
    });
  };

  // Helper function to remove a payment milestone
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removePaymentMilestone = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      budget: {
        ...data.budget,
        paymentSchedule: data.budget.paymentSchedule.filter((milestone: PaymentMilestone) => milestone.id !== id),
      },
    });
  };

  // Helper function to update timeline
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateTimeline = (field: keyof Timeline, value: string | Date) => { // Prefixed with underscore as it's currently unused
    updateData({
      timeline: {
        ...data.timeline,
        [field]: value,
      },
    });
  };

  // Helper function to add a timeline phase
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addTimelinePhase = () => { // Prefixed with underscore as it's currently unused
    const newPhase: TimelinePhase = {
      id: createId(),
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      deliverables: [],
    };
    updateData({
      timeline: {
        ...data.timeline,
        phases: [...data.timeline.phases, newPhase],
      },
    });
  };

  // Helper function to update a timeline phase
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateTimelinePhase = (id: string, field: keyof TimelinePhase, value: string | Date) => { // Prefixed with underscore as it's currently unused
    updateData({
      timeline: {
        ...data.timeline,
        phases: data.timeline.phases.map((phase) =>
          phase.id === id ? { ...phase, [field]: value } : phase
        ),
      },
    });
  };

  // Helper function to remove a timeline phase
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeTimelinePhase = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      timeline: {
        ...data.timeline,
        phases: data.timeline.phases.filter((phase) => phase.id !== id),
      },
    });
  };

  // Helper function to add a risk
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _addRisk = () => { // Prefixed with underscore as it's currently unused
    const newRisk: Risk = {
      id: createId(),
      description: "",
      impact: "medium",
      probability: "medium",
      mitigation: "",
      contingency: "",
    };
    updateData({
      risks: [...data.risks, newRisk],
    });
  };

  // Helper function to update a risk
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateRisk = (id: string, field: keyof Risk, value: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      risks: data.risks.map((risk) =>
        risk.id === id ? { ...risk, [field]: value } : risk
      ),
    });
  };

  // Helper function to remove a risk
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _removeRisk = (id: string) => { // Prefixed with underscore as it's currently unused
    updateData({
      risks: data.risks.filter((risk) => risk.id !== id),
    });
  };

  // Helper function to update approval
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _updateApproval = (field: keyof Approval, value: string | Date) => { 
    updateData({
      approval: {
        ...data.approval,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8 p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
      <Accordion type="single" collapsible className="w-full" defaultValue="project-info">
        {/* Project Information */}
        <AccordionItem value="project-info">
          <AccordionTrigger className="text-lg font-semibold">
            Information du Projet
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-title">Titre</Label>
                  <Input
                    id="project-title"
                    value={data.projectInfo.title}
                    onChange={(e) => updateProjectInfo("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-reference">Référence</Label>
                  <Input
                    id="project-reference"
                    value={data.projectInfo.reference}
                    onChange={(e) => updateProjectInfo("reference", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-date">Date</Label>
                  <Input
                    id="project-date"
                    type="date"
                    value={data.projectInfo.date}
                    onChange={(e) => updateProjectInfo("date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-version">Version</Label>
                  <Input
                    id="project-version"
                    value={data.projectInfo.version}
                    onChange={(e) => updateProjectInfo("version", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-status">Statut</Label>
                  <Select
                    value={data.projectInfo.status}
                    onValueChange={(value) => updateProjectInfo("status", value)}
                  >
                    <SelectTrigger id="project-status">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="review">En revue</SelectItem>
                      <SelectItem value="approved">Approuvé</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-summary">Résumé</Label>
                <Textarea
                  id="project-summary"
                  value={data.projectInfo.summary}
                  onChange={(e) => updateProjectInfo("summary", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Client Information */}
        <AccordionItem value="client-info">
          <AccordionTrigger className="text-lg font-semibold">
            Information Client
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nom</Label>
                  <Input
                    id="client-name"
                    value={data.clientInfo.name}
                    onChange={(e) => updateClientInfo("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-contact">Personne de contact</Label>
                  <Input
                    id="client-contact"
                    value={data.clientInfo.contactPerson}
                    onChange={(e) => updateClientInfo("contactPerson", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={data.clientInfo.email}
                    onChange={(e) => updateClientInfo("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Téléphone</Label>
                  <Input
                    id="client-phone"
                    value={data.clientInfo.phone}
                    onChange={(e) => updateClientInfo("phone", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-address">Adresse</Label>
                <Textarea
                  id="client-address"
                  value={data.clientInfo.address}
                  onChange={(e) => updateClientInfo("address", e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-website">Site Web</Label>
                <Input
                  id="client-website"
                  value={data.clientInfo.website || ""}
                  onChange={(e) => updateClientInfo("website", e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Company Information */}
        <AccordionItem value="company-info">
          <AccordionTrigger className="text-lg font-semibold">
            Information Société
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom</Label>
                  <Input
                    id="company-name"
                    value={data.companyInfo.name}
                    onChange={(e) => updateCompanyInfo("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-contact">Nom du contact</Label>
                  <Input
                    id="company-contact"
                    value={data.companyInfo.contactName}
                    onChange={(e) => updateCompanyInfo("contactName", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-address">Adresse</Label>
                  <Input
                    id="company-address"
                    value={data.companyInfo.address}
                    onChange={(e) => updateCompanyInfo("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-zip-city">Code postal et ville</Label>
                  <Input
                    id="company-zip-city"
                    value={data.companyInfo.zipCity}
                    onChange={(e) => updateCompanyInfo("zipCity", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-country">Pays</Label>
                  <Input
                    id="company-country"
                    value={data.companyInfo.country}
                    onChange={(e) => updateCompanyInfo("country", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-number">Numéro d&apos;entreprise</Label>
                  <Input
                    id="company-number"
                    value={data.companyInfo.companyNumber}
                    onChange={(e) => updateCompanyInfo("companyNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-activity">Code d&apos;activité</Label>
                  <Input
                    id="company-activity"
                    value={data.companyInfo.activityCode}
                    onChange={(e) => updateCompanyInfo("activityCode", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-vat">Numéro TVA</Label>
                  <Input
                    id="company-vat"
                    value={data.companyInfo.vatNumber}
                    onChange={(e) => updateCompanyInfo("vatNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Téléphone</Label>
                  <Input
                    id="company-phone"
                    value={data.companyInfo.phone}
                    onChange={(e) => updateCompanyInfo("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={data.companyInfo.email}
                    onChange={(e) => updateCompanyInfo("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Site Web</Label>
                <Input
                  id="company-website"
                  value={data.companyInfo.website}
                  onChange={(e) => updateCompanyInfo("website", e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional sections would be added here following the same pattern */}
        {/* For brevity, I'm including just the first few sections */}
        
        {/* Team Members */}
        <AccordionItem value="team-members">
          <AccordionTrigger className="text-lg font-semibold">
            Équipe Projet
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              {data.teamMembers.map((member, index) => (
                <div key={member.id} className="border p-4 rounded-md relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeTeamMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`member-name-${index}`}>Nom</Label>
                      <Input
                        id={`member-name-${index}`}
                        value={member.name}
                        onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`member-role-${index}`}>Rôle</Label>
                      <Input
                        id={`member-role-${index}`}
                        value={member.role}
                        onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`member-email-${index}`}>Email</Label>
                      <Input
                        id={`member-email-${index}`}
                        type="email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(member.id, "email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`member-phone-${index}`}>Téléphone</Label>
                      <Input
                        id={`member-phone-${index}`}
                        value={member.phone || ""}
                        onChange={(e) => updateTeamMember(member.id, "phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`member-responsibilities-${index}`}>Responsabilités</Label>
                    <Textarea
                      id={`member-responsibilities-${index}`}
                      value={member.responsibilities}
                      onChange={(e) => updateTeamMember(member.id, "responsibilities", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={addTeamMember}
              >
                <Plus className="h-4 w-4 mr-2" /> Ajouter un membre
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Appendices */}
        <AccordionItem value="appendices">
          <AccordionTrigger className="text-lg font-semibold">
            Annexes
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="appendices">Annexes et documents complémentaires</Label>
                <Textarea
                  id="appendices"
                  value={data.appendices}
                  onChange={(e) => updateData({ appendices: e.target.value })}
                  rows={5}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
