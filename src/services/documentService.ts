import { Document, DocumentType } from '@/types/document';
import { v4 as uuidv4 } from 'uuid';

// Mock data for documents
const mockDocuments: Document[] = [
  {
    id: uuidv4(),
    title: 'Devis - Site Web E-commerce',
    type: 'devis',
    createdAt: new Date(2025, 4, 15).toISOString(),
    updatedAt: new Date(2025, 4, 15).toISOString(),
    createdBy: 'user123',
    content: {
      clientInfo: {
        name: 'Entreprise ABC',
        address: '123 Rue du Commerce, Paris',
        email: 'contact@entrepriseabc.com',
      },
      items: [
        { description: 'Développement site e-commerce', quantity: 1, unitPrice: 2500 }
      ]
    },
    status: 'draft',
    tags: ['web', 'e-commerce']
  },
  {
    id: uuidv4(),
    title: 'Facture - Application Mobile',
    type: 'facture',
    createdAt: new Date(2025, 4, 10).toISOString(),
    updatedAt: new Date(2025, 4, 12).toISOString(),
    createdBy: 'user123',
    content: {
      clientInfo: {
        name: 'Startup XYZ',
        address: '456 Avenue Innovation, Lyon',
        email: 'finance@startupxyz.com',
      },
      items: [
        { description: 'Développement application mobile', quantity: 1, unitPrice: 3800 }
      ]
    },
    status: 'sent',
    tags: ['mobile', 'application']
  },
  {
    id: uuidv4(),
    title: 'Convention de Stage - Développeur Frontend',
    type: 'convention-de-stage',
    createdAt: new Date(2025, 3, 20).toISOString(),
    updatedAt: new Date(2025, 3, 22).toISOString(),
    createdBy: 'user123',
    content: {
      stagiaireInfo: {
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        school: 'École Supérieure d\'Informatique'
      },
      entrepriseInfo: {
        name: 'PLEDGE AND GROW',
        address: '4bis Rue Alfred Nobel, Champs-sur-marne'
      }
    },
    status: 'signed',
    tags: ['stage', 'frontend']
  },
  {
    id: uuidv4(),
    title: 'Devis - Refonte Site Vitrine',
    type: 'devis',
    createdAt: new Date(2025, 4, 5).toISOString(),
    updatedAt: new Date(2025, 4, 5).toISOString(),
    createdBy: 'user123',
    content: {
      clientInfo: {
        name: 'Restaurant Le Gourmet',
        address: '789 Boulevard Gastronomie, Bordeaux',
        email: 'contact@legourmet.fr',
      },
      items: [
        { description: 'Refonte site vitrine responsive', quantity: 1, unitPrice: 1800 }
      ]
    },
    status: 'final',
    tags: ['web', 'vitrine']
  },
  {
    id: uuidv4(),
    title: 'Contrat - Maintenance Informatique',
    type: 'contrat',
    createdAt: new Date(2025, 3, 28).toISOString(),
    updatedAt: new Date(2025, 3, 30).toISOString(),
    createdBy: 'user123',
    content: {
      clientInfo: {
        name: 'Cabinet Juridique & Associés',
        address: '101 Rue du Droit, Marseille',
        email: 'admin@cabinetjuridique.com',
      }
    },
    status: 'draft',
    tags: ['maintenance', 'service']
  }
];

export const documentService = {
  // Get all documents
  getDocuments: async (): Promise<Document[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockDocuments];
  },

  // Get document by ID
  getDocumentById: async (id: string): Promise<Document | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const document = mockDocuments.find(doc => doc.id === id);
    return document || null;
  },

  // Get documents by type
  getDocumentsByType: async (type: DocumentType): Promise<Document[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockDocuments.filter(doc => doc.type === type);
  },

  // Create new document
  createDocument: async (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newDocument: Document = {
      ...document,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockDocuments.push(newDocument);
    return newDocument;
  },

  // Update document
  updateDocument: async (id: string, updates: Partial<Document>): Promise<Document | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index === -1) return null;
    
    const updatedDocument = {
      ...mockDocuments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    mockDocuments[index] = updatedDocument;
    return updatedDocument;
  },

  // Delete document
  deleteDocument: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index === -1) return false;
    
    mockDocuments.splice(index, 1);
    return true;
  }
};
