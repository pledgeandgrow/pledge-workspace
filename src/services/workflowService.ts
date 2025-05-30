import { Workflow, WorkflowExecution, WorkflowStatus, WorkflowTriggerType } from '@/types/workflow';
import { v4 as uuidv4 } from 'uuid';

// Mock data for workflows
const mockWorkflows: Workflow[] = [
  {
    id: uuidv4(),
    name: 'Génération automatique de devis',
    description: 'Crée automatiquement un devis lorsqu\'un nouveau client est ajouté via l\'API',
    status: 'active',
    createdAt: new Date(2025, 4, 15).toISOString(),
    updatedAt: new Date(2025, 4, 15).toISOString(),
    createdBy: 'user123',
    trigger: {
      id: uuidv4(),
      type: 'webhook',
      name: 'Nouveau client',
      config: {
        endpoint: '/api/webhooks/new-client',
      }
    },
    steps: [
      {
        id: uuidv4(),
        name: 'Créer devis',
        description: 'Crée un nouveau devis basé sur les informations du client',
        action: {
          id: uuidv4(),
          type: 'create_document',
          name: 'Créer devis',
          config: {
            documentType: 'devis',
            templateId: 'template-standard',
          }
        },
        nextSteps: []
      }
    ],
    webhookUrl: 'https://pledge-workspace.vercel.app/api/webhooks/new-client',
    apiKey: 'wf_' + uuidv4().substring(0, 8),
    tags: ['devis', 'automatisation', 'clients'],
    executions: 24,
    lastExecuted: new Date(2025, 4, 29).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Envoi de facture mensuelle',
    description: 'Génère et envoie automatiquement des factures mensuelles pour les clients avec abonnement',
    status: 'active',
    createdAt: new Date(2025, 3, 10).toISOString(),
    updatedAt: new Date(2025, 4, 5).toISOString(),
    createdBy: 'user123',
    trigger: {
      id: uuidv4(),
      type: 'schedule',
      name: 'Planification mensuelle',
      config: {
        schedule: '0 9 1 * *', // 1er jour du mois à 9h
      }
    },
    steps: [
      {
        id: uuidv4(),
        name: 'Générer factures',
        description: 'Génère les factures pour tous les clients avec abonnement actif',
        action: {
          id: uuidv4(),
          type: 'create_document',
          name: 'Générer factures',
          config: {
            documentType: 'facture',
            templateId: 'template-abonnement',
          }
        },
        nextSteps: [uuidv4()]
      },
      {
        id: uuidv4(),
        name: 'Envoyer factures',
        description: 'Envoie les factures générées par email',
        action: {
          id: uuidv4(),
          type: 'send_email',
          name: 'Envoyer factures',
          config: {
            templateId: 'email-facture',
          }
        },
        nextSteps: []
      }
    ],
    apiKey: 'wf_' + uuidv4().substring(0, 8),
    tags: ['facture', 'automatisation', 'abonnement'],
    executions: 5,
    lastExecuted: new Date(2025, 4, 1).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Intégration ChatGPT pour création de contrats',
    description: 'Permet à ChatGPT de créer des contrats via notre API',
    status: 'active',
    createdAt: new Date(2025, 4, 20).toISOString(),
    updatedAt: new Date(2025, 4, 20).toISOString(),
    createdBy: 'user123',
    trigger: {
      id: uuidv4(),
      type: 'api',
      name: 'Appel API',
      config: {
        endpoint: '/api/ai/create-contract',
      }
    },
    steps: [
      {
        id: uuidv4(),
        name: 'Analyser requête',
        description: 'Analyse la requête de l\'IA pour extraire les informations pertinentes',
        action: {
          id: uuidv4(),
          type: 'custom_function',
          name: 'Analyser requête',
          config: {
            functionName: 'analyzeAIRequest',
          }
        },
        nextSteps: [uuidv4()]
      },
      {
        id: uuidv4(),
        name: 'Générer contrat',
        description: 'Génère un contrat basé sur les informations extraites',
        action: {
          id: uuidv4(),
          type: 'create_document',
          name: 'Générer contrat',
          config: {
            documentType: 'contrat',
            templateId: 'template-ai-generated',
          }
        },
        nextSteps: []
      }
    ],
    apiKey: 'wf_' + uuidv4().substring(0, 8),
    webhookUrl: 'https://pledge-workspace.vercel.app/api/ai/create-contract',
    tags: ['ai', 'contrat', 'intégration'],
    executions: 42,
    lastExecuted: new Date(2025, 4, 30).toISOString()
  },
  {
    id: uuidv4(),
    name: 'Workflow de validation de documents',
    description: 'Processus de validation des documents avec plusieurs approbateurs',
    status: 'draft',
    createdAt: new Date(2025, 4, 25).toISOString(),
    updatedAt: new Date(2025, 4, 25).toISOString(),
    createdBy: 'user123',
    trigger: {
      id: uuidv4(),
      type: 'event',
      name: 'Document créé',
      config: {
        event: 'document.created',
      }
    },
    steps: [
      {
        id: uuidv4(),
        name: 'Notifier approbateurs',
        description: 'Envoie une notification aux approbateurs désignés',
        action: {
          id: uuidv4(),
          type: 'send_email',
          name: 'Notifier approbateurs',
          config: {
            templateId: 'email-approbation',
          }
        },
        nextSteps: [uuidv4()]
      },
      {
        id: uuidv4(),
        name: 'Attendre approbation',
        description: 'Attend l\'approbation de tous les approbateurs',
        action: {
          id: uuidv4(),
          type: 'custom_function',
          name: 'Attendre approbation',
          config: {
            functionName: 'waitForApprovals',
          }
        },
        nextSteps: [uuidv4()]
      },
      {
        id: uuidv4(),
        name: 'Finaliser document',
        description: 'Marque le document comme approuvé et final',
        action: {
          id: uuidv4(),
          type: 'update_document',
          name: 'Finaliser document',
          config: {
            status: 'final',
          }
        },
        nextSteps: []
      }
    ],
    apiKey: 'wf_' + uuidv4().substring(0, 8),
    tags: ['validation', 'approbation', 'processus'],
    executions: 0
  }
];

// Mock data for workflow executions
const mockExecutions: WorkflowExecution[] = [
  {
    id: uuidv4(),
    workflowId: mockWorkflows[0].id,
    status: 'success',
    startedAt: new Date(2025, 4, 29, 14, 30).toISOString(),
    completedAt: new Date(2025, 4, 29, 14, 31).toISOString(),
    input: {
      clientName: 'Société Innovante',
      clientEmail: 'contact@societe-innovante.fr',
      clientAddress: '123 Avenue de l\'Innovation, Paris'
    },
    output: {
      documentId: uuidv4(),
      documentType: 'devis',
      status: 'created'
    },
    steps: [
      {
        stepId: mockWorkflows[0].steps[0].id,
        status: 'success',
        startedAt: new Date(2025, 4, 29, 14, 30, 5).toISOString(),
        completedAt: new Date(2025, 4, 29, 14, 30, 45).toISOString(),
        input: {
          clientName: 'Société Innovante',
          clientEmail: 'contact@societe-innovante.fr',
          clientAddress: '123 Avenue de l\'Innovation, Paris'
        },
        output: {
          documentId: uuidv4(),
          documentType: 'devis',
          status: 'created'
        }
      }
    ]
  },
  {
    id: uuidv4(),
    workflowId: mockWorkflows[1].id,
    status: 'success',
    startedAt: new Date(2025, 4, 1, 9, 0).toISOString(),
    completedAt: new Date(2025, 4, 1, 9, 15).toISOString(),
    input: {
      month: 'Mai',
      year: '2025',
      clients: ['client1', 'client2', 'client3']
    },
    output: {
      facturesGenerated: 3,
      facturesEmailed: 3
    },
    steps: [
      {
        stepId: mockWorkflows[1].steps[0].id,
        status: 'success',
        startedAt: new Date(2025, 4, 1, 9, 0, 5).toISOString(),
        completedAt: new Date(2025, 4, 1, 9, 5, 45).toISOString(),
        input: {
          month: 'Mai',
          year: '2025',
          clients: ['client1', 'client2', 'client3']
        },
        output: {
          facturesGenerated: 3,
          factureIds: [uuidv4(), uuidv4(), uuidv4()]
        }
      },
      {
        stepId: mockWorkflows[1].steps[1].id,
        status: 'success',
        startedAt: new Date(2025, 4, 1, 9, 6, 0).toISOString(),
        completedAt: new Date(2025, 4, 1, 9, 14, 30).toISOString(),
        input: {
          factureIds: [uuidv4(), uuidv4(), uuidv4()]
        },
        output: {
          facturesEmailed: 3,
          emailsSent: ['client1@example.com', 'client2@example.com', 'client3@example.com']
        }
      }
    ]
  },
  {
    id: uuidv4(),
    workflowId: mockWorkflows[2].id,
    status: 'failed',
    startedAt: new Date(2025, 4, 30, 10, 15).toISOString(),
    completedAt: new Date(2025, 4, 30, 10, 16).toISOString(),
    input: {
      contractType: 'NDA',
      parties: ['Entreprise A', 'Entreprise B'],
      duration: '12 months'
    },
    error: 'Erreur lors de l\'analyse de la requête: format de données invalide',
    steps: [
      {
        stepId: mockWorkflows[2].steps[0].id,
        status: 'failed',
        startedAt: new Date(2025, 4, 30, 10, 15, 5).toISOString(),
        completedAt: new Date(2025, 4, 30, 10, 15, 45).toISOString(),
        input: {
          contractType: 'NDA',
          parties: ['Entreprise A', 'Entreprise B'],
          duration: '12 months'
        },
        error: 'Format de données invalide: le champ "confidentialityScope" est requis'
      },
      {
        stepId: mockWorkflows[2].steps[1].id,
        status: 'skipped',
        startedAt: new Date(2025, 4, 30, 10, 15, 45).toISOString(),
        completedAt: new Date(2025, 4, 30, 10, 15, 45).toISOString(),
        input: {}
      }
    ]
  }
];

export const workflowService = {
  // Get all workflows
  getWorkflows: async (): Promise<Workflow[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockWorkflows];
  },

  // Get workflow by ID
  getWorkflowById: async (id: string): Promise<Workflow | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const workflow = mockWorkflows.find(wf => wf.id === id);
    return workflow || null;
  },

  // Get workflows by status
  getWorkflowsByStatus: async (status: WorkflowStatus): Promise<Workflow[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockWorkflows.filter(wf => wf.status === status);
  },

  // Get workflows by trigger type
  getWorkflowsByTriggerType: async (triggerType: WorkflowTriggerType): Promise<Workflow[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockWorkflows.filter(wf => wf.trigger.type === triggerType);
  },

  // Create new workflow
  createWorkflow: async (workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workflow> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newWorkflow: Workflow = {
      ...workflow,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockWorkflows.push(newWorkflow);
    return newWorkflow;
  },

  // Update workflow
  updateWorkflow: async (id: string, updates: Partial<Workflow>): Promise<Workflow | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockWorkflows.findIndex(wf => wf.id === id);
    if (index === -1) return null;
    
    const updatedWorkflow = {
      ...mockWorkflows[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    mockWorkflows[index] = updatedWorkflow;
    return updatedWorkflow;
  },

  // Delete workflow
  deleteWorkflow: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockWorkflows.findIndex(wf => wf.id === id);
    if (index === -1) return false;
    
    mockWorkflows.splice(index, 1);
    return true;
  },

  // Get workflow executions
  getWorkflowExecutions: async (workflowId?: string): Promise<WorkflowExecution[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (workflowId) {
      return mockExecutions.filter(exec => exec.workflowId === workflowId);
    }
    return [...mockExecutions];
  },

  // Get workflow execution by ID
  getWorkflowExecutionById: async (id: string): Promise<WorkflowExecution | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const execution = mockExecutions.find(exec => exec.id === id);
    return execution || null;
  },

  // Generate API key for workflow
  generateApiKey: async (workflowId: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const apiKey = 'wf_' + uuidv4().substring(0, 16);
    
    const index = mockWorkflows.findIndex(wf => wf.id === workflowId);
    if (index !== -1) {
      mockWorkflows[index].apiKey = apiKey;
    }
    
    return apiKey;
  }
};
