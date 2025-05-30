export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  notifications: {
    email: boolean;
    browser: boolean;
    documents: boolean;
    workflows: boolean;
  };
  defaultCurrency: string;
  defaultTaxRate: number;
  companyInfo: {
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
    iban: string;
    bic: string;
    logo?: string;
  };
  documentSettings: {
    defaultPaymentTerms: string;
    defaultPaymentMethod: string;
    defaultValidity: string;
    defaultTermsAndConditions: string;
  };
  apiKeys: ApiKey[];
  webhooks: Webhook[];
  updatedAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  scopes: string[];
  active: boolean;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface SettingsState {
  settings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
}
