export interface ProjectInfo {
  title: string;
  reference: string;
  date: string;
  version: string;
  status: "draft" | "review" | "approved" | "completed";
  summary: string;
}

export interface ClientInfo {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
}

export interface CompanyInfo {
  name: string;
  contactName: string;
  address: string;
  zipCity: string;
  country: string;
  companyNumber: string;
  activityCode: string;
  vatNumber: string;
  phone: string;
  email: string;
  website: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  responsibilities: string;
}

export interface ProjectObjective {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  measurableOutcome?: string;
}

export interface ProjectScope {
  inScope: string;
  outOfScope: string;
  assumptions: string;
  constraints: string;
  dependencies: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  format: string;
  dueDate: string;
  acceptanceCriteria: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  deliverables: string[];
}

export interface FunctionalRequirement {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  acceptanceCriteria: string;
}

export interface TechnicalRequirement {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  implementation: string;
}

export interface QualityRequirement {
  id: string;
  category: "performance" | "security" | "usability" | "reliability" | "maintainability" | "other";
  title: string;
  description: string;
  measurementCriteria: string;
}

export interface Budget {
  totalAmount: number;
  currency: string;
  breakdown: BudgetItem[];
  paymentSchedule: PaymentMilestone[];
  notes: string;
}

export interface BudgetItem {
  id: string;
  description: string;
  amount: number;
  category: string;
}

export interface PaymentMilestone {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  conditions: string;
}

export interface Timeline {
  startDate: string;
  endDate: string;
  phases: TimelinePhase[];
  notes: string;
}

export interface TimelinePhase {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  deliverables: string[];
}

export interface Risk {
  id: string;
  description: string;
  impact: "high" | "medium" | "low";
  probability: "high" | "medium" | "low";
  mitigation: string;
  contingency: string;
}

export interface Approval {
  clientName: string;
  clientTitle: string;
  clientSignatureDate: string;
  companyName: string;
  companyTitle: string;
  companySignatureDate: string;
  notes: string;
}

export interface CahierDesCharges {
  projectInfo: ProjectInfo;
  clientInfo: ClientInfo;
  companyInfo: CompanyInfo;
  teamMembers: TeamMember[];
  objectives: ProjectObjective[];
  scope: ProjectScope;
  deliverables: Deliverable[];
  milestones: Milestone[];
  functionalRequirements: FunctionalRequirement[];
  technicalRequirements: TechnicalRequirement[];
  qualityRequirements: QualityRequirement[];
  budget: Budget;
  timeline: Timeline;
  risks: Risk[];
  approval: Approval;
  appendices: string;
}
