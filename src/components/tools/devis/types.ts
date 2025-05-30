export interface EstimateItem {
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

export interface EstimateInfo {
  title: string;
  number: string;
  date: string;
  validUntil: string;
  notes: string;
  paymentTerms: string;
  paymentMethod: string;
  validity: string;
  termsAndConditions: string;
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
