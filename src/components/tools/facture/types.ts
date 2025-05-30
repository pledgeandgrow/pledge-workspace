export interface InvoiceItem {
  id: string;
  type: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
}

export interface ClientInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  isCompany: boolean;
  companyName?: string;
  vatNumber?: string;
  registrationNumber?: string;
  contactPerson?: string;
  website?: string;
}

export interface InvoiceInfo {
  title: string;
  number: string;
  date: string;
  dueDate: string;
  notes: string;
  paymentTerms: string;
  paymentMethod: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  termsAndConditions: string;
  referenceDevis?: string; // Reference to the estimate if this invoice is based on one
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
  description: string;
  logo?: string;
  iban: string;
  bic: string;
}
