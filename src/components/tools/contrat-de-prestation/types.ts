export interface ClientInfo {
  type: "company" | "individual";
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  contactPerson?: string;
  siret?: string;
  tvaNumber?: string;
}

export interface ProviderInfo {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  siret: string;
  activityCode: string;
  tvaNumber: string;
  email: string;
  phone: string;
  website: string;
  representativeName: string;
  representativeTitle: string;
  bankDetails: {
    bankName: string;
    iban: string;
    bic: string;
  };
}

export interface ServiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tvaRate: number;
  totalHT: number;
  totalTTC: number;
}

export interface PaymentConditions {
  method: "virement" | "chèque" | "espèces" | "carte" | "prélèvement" | "autre";
  terms: string;
  deadlineInDays: number;
  advancePayment?: {
    percentage: number;
    amount: number;
  };
  penalties: string;
}

export interface ContractDuration {
  type: "fixed" | "indefinite" | "project";
  startDate: string;
  endDate?: string;
  renewalTerms?: string;
  terminationNotice: string;
}

export interface ContractInfo {
  reference: string;
  date: string;
  title: string;
  description: string;
  scope: string;
  deliverables: string;
  timeline: string;
  location: string;
  confidentiality: string;
  intellectualProperty: string;
  warranties: string;
  liabilities: string;
  forceMajeure: string;
  disputeResolution: string;
  applicableLaw: string;
  additionalClauses: string;
}

export interface ContratDePrestation {
  clientInfo: ClientInfo;
  providerInfo: ProviderInfo;
  serviceItems: ServiceItem[];
  paymentConditions: PaymentConditions;
  contractDuration: ContractDuration;
  contractInfo: ContractInfo;
  totalHT: number;
  totalTVA: number;
  totalTTC: number;
}
