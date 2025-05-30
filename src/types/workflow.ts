export type WorkflowStatus = 'active' | 'inactive' | 'draft' | 'archived';
export type WorkflowTriggerType = 'webhook' | 'schedule' | 'api' | 'event';
export type WorkflowActionType = 'create_document' | 'send_email' | 'update_document' | 'api_call' | 'custom_function';

export interface WorkflowTrigger {
  id: string;
  type: WorkflowTriggerType;
  name: string;
  config: {
    endpoint?: string;
    schedule?: string;
    event?: string;
    apiKey?: string;
    headers?: Record<string, string>;
  };
}

export interface WorkflowAction {
  id: string;
  type: WorkflowActionType;
  name: string;
  config: {
    documentType?: string;
    templateId?: string;
    endpoint?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: string;
    functionName?: string;
    parameters?: Record<string, unknown>;
  };
}

export interface WorkflowStep {
  id: string;
  name: string;
  description?: string;
  action: WorkflowAction;
  nextSteps?: string[]; // IDs of the next steps
  conditions?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: string | number | boolean | null | Record<string, unknown>;
  }[];
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  apiKey?: string;
  webhookUrl?: string;
  tags?: string[];
  executions?: number;
  lastExecuted?: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'success' | 'failed' | 'in_progress';
  startedAt: string;
  completedAt?: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: string;
  steps: {
    stepId: string;
    status: 'success' | 'failed' | 'skipped';
    startedAt: string;
    completedAt?: string;
    input: Record<string, unknown>;
    output?: Record<string, unknown>;
    error?: string;
  }[];
}

export interface WorkflowsState {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  executions: WorkflowExecution[];
  isLoading: boolean;
  error: string | null;
}
