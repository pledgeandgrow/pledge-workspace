import { UserSettings, ApiKey, Webhook } from '@/types/settings';
import { v4 as uuidv4 } from 'uuid';

// Mock user settings
const mockSettings: UserSettings = {
  id: uuidv4(),
  userId: 'user123',
  theme: 'dark',
  language: 'fr',
  notifications: {
    email: true,
    browser: true,
    documents: true,
    workflows: false
  },
  defaultCurrency: 'EUR',
  defaultTaxRate: 20,
  companyInfo: {
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
    description: "Digitalisation de projets informatiques.",
    iban: "FR76 3000 3041 2100 0207 5312 595",
    bic: "SOGEFRPP",
    logo: "https://pledgeandgrow.com/logo.png"
  },
  documentSettings: {
    defaultPaymentTerms: "30 jours",
    defaultPaymentMethod: "Virement bancaire",
    defaultValidity: "30 jours",
    defaultTermsAndConditions: "Les présentes conditions générales de vente s'appliquent à toutes les prestations de services conclues par le prestataire auprès des clients, quelles que soient les clauses pouvant figurer sur les documents du client, et notamment ses conditions générales d'achat."
  },
  apiKeys: [
    {
      id: uuidv4(),
      name: "API Key Production",
      key: "pk_" + uuidv4().replace(/-/g, ''),
      createdAt: new Date(2025, 3, 15).toISOString(),
      lastUsed: new Date(2025, 4, 29).toISOString(),
      scopes: ["documents:read", "documents:write", "workflows:read"],
      active: true
    },
    {
      id: uuidv4(),
      name: "API Key Test",
      key: "pk_test_" + uuidv4().replace(/-/g, ''),
      createdAt: new Date(2025, 4, 10).toISOString(),
      lastUsed: new Date(2025, 4, 20).toISOString(),
      scopes: ["documents:read", "documents:write", "workflows:read", "workflows:write"],
      active: true
    }
  ],
  webhooks: [
    {
      id: uuidv4(),
      name: "Document Created Webhook",
      url: "https://example.com/webhooks/documents",
      secret: "whsec_" + uuidv4().substring(0, 24),
      events: ["document.created", "document.updated"],
      active: true,
      createdAt: new Date(2025, 4, 5).toISOString(),
      lastTriggered: new Date(2025, 4, 28).toISOString()
    }
  ],
  updatedAt: new Date(2025, 4, 30).toISOString()
};

export const settingsService = {
  // Get user settings
  getUserSettings: async (userId: string): Promise<UserSettings> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockSettings, userId };
  },

  // Update user settings
  updateUserSettings: async (userId: string, updates: Partial<UserSettings>): Promise<UserSettings> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const updatedSettings = {
      ...mockSettings,
      ...updates,
      userId,
      updatedAt: new Date().toISOString()
    };
    
    return updatedSettings;
  },

  // Create API key
  createApiKey: async (userId: string, name: string, scopes: string[]): Promise<ApiKey> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newApiKey: ApiKey = {
      id: uuidv4(),
      name,
      key: "pk_" + uuidv4().replace(/-/g, ''),
      createdAt: new Date().toISOString(),
      scopes,
      active: true
    };
    
    mockSettings.apiKeys.push(newApiKey);
    
    return newApiKey;
  },

  // Update API key
  updateApiKey: async (keyId: string, updates: Partial<ApiKey>): Promise<ApiKey | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const keyIndex = mockSettings.apiKeys.findIndex(key => key.id === keyId);
    if (keyIndex === -1) return null;
    
    const updatedKey = {
      ...mockSettings.apiKeys[keyIndex],
      ...updates
    };
    
    mockSettings.apiKeys[keyIndex] = updatedKey;
    
    return updatedKey;
  },

  // Delete API key
  deleteApiKey: async (keyId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const keyIndex = mockSettings.apiKeys.findIndex(key => key.id === keyId);
    if (keyIndex === -1) return false;
    
    mockSettings.apiKeys.splice(keyIndex, 1);
    
    return true;
  },

  // Create webhook
  createWebhook: async (userId: string, name: string, url: string, events: string[]): Promise<Webhook> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newWebhook: Webhook = {
      id: uuidv4(),
      name,
      url,
      secret: "whsec_" + uuidv4().substring(0, 24),
      events,
      active: true,
      createdAt: new Date().toISOString()
    };
    
    mockSettings.webhooks.push(newWebhook);
    
    return newWebhook;
  },

  // Update webhook
  updateWebhook: async (webhookId: string, updates: Partial<Webhook>): Promise<Webhook | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const webhookIndex = mockSettings.webhooks.findIndex(webhook => webhook.id === webhookId);
    if (webhookIndex === -1) return null;
    
    const updatedWebhook = {
      ...mockSettings.webhooks[webhookIndex],
      ...updates
    };
    
    mockSettings.webhooks[webhookIndex] = updatedWebhook;
    
    return updatedWebhook;
  },

  // Delete webhook
  deleteWebhook: async (webhookId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const webhookIndex = mockSettings.webhooks.findIndex(webhook => webhook.id === webhookId);
    if (webhookIndex === -1) return false;
    
    mockSettings.webhooks.splice(webhookIndex, 1);
    
    return true;
  }
};
