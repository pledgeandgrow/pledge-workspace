// Define common content types
type ClientInfo = {
  name?: string;
  address?: string;
  email?: string;
  // Add other possible properties that might be used in the application
  phone?: string;
};

type ServiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type StudentInfo = {
  name?: string;
  school?: string;
  email?: string;
  // Add other possible properties that might be used in the application
  phone?: string;
  address?: string;
};

type CompanyInfo = {
  name?: string;
  address?: string;
};

type DocumentContentType = {
  clientInfo?: ClientInfo;
  items?: ServiceItem[];
  stagiaireInfo?: StudentInfo;
  entrepriseInfo?: CompanyInfo;
  ecoleInfo?: { name?: string };
  tuteurInfo?: { name?: string };
  [key: string]: unknown; // For other properties we might not have typed yet
};

export type DocumentType = 'devis' | 'facture' | 'contrat' | 'convention-de-stage' | 'cahier-des-charges' | string;

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  content: DocumentContentType; // Using our typed content interface
  status: 'draft' | 'final' | 'sent' | 'paid' | 'signed' | 'expired';
  tags?: string[];
  thumbnail?: string;
}

export interface DocumentsState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
}
