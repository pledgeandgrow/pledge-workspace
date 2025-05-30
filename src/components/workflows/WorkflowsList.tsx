"use client";

import { useState, useEffect } from "react";
import { Workflow } from "@/types/workflow";
import { workflowService } from "@/services/workflowService";
import WorkflowCard from "./WorkflowCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Loader2, Webhook, Calendar, Zap, Activity } from "lucide-react";

export function WorkflowsList() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [triggerFilter, setTriggerFilter] = useState<string>("all");

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setIsLoading(true);
        const data = await workflowService.getWorkflows();
        setWorkflows(data);
        setFilteredWorkflows(data);
      } catch (error) {
        console.error("Error fetching workflows:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...workflows];

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(wf => 
        wf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (wf.description && wf.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (wf.tags && wf.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(wf => wf.status === statusFilter);
    }

    // Apply trigger filter
    if (triggerFilter !== "all") {
      filtered = filtered.filter(wf => wf.trigger.type === triggerFilter);
    }

    setFilteredWorkflows(filtered);
  }, [workflows, searchTerm, statusFilter, triggerFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleTriggerFilterChange = (value: string) => {
    setTriggerFilter(value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTriggerFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un workflow..."
            className="pl-10 bg-background text-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[160px] bg-background text-white">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="archived">Archivé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={triggerFilter} onValueChange={handleTriggerFilterChange}>
            <SelectTrigger className="w-[160px] bg-background text-white">
              <SelectValue placeholder="Type de déclencheur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="webhook">
                <div className="flex items-center">
                  <Webhook className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Webhook</span>
                </div>
              </SelectItem>
              <SelectItem value="schedule">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Planifié</span>
                </div>
              </SelectItem>
              <SelectItem value="api">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-amber-500" />
                  <span>API</span>
                </div>
              </SelectItem>
              <SelectItem value="event">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-green-500" />
                  <span>Événement</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {(searchTerm || statusFilter !== "all" || triggerFilter !== "all") && (
            <Button variant="outline" onClick={clearFilters} className="text-white">
              Effacer
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        {filteredWorkflows.length} workflow{filteredWorkflows.length !== 1 ? 's' : ''} trouvé{filteredWorkflows.length !== 1 ? 's' : ''}
      </div>

      {/* Workflows grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredWorkflows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-gray-500">Aucun workflow trouvé</p>
          <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos filtres ou créez un nouveau workflow</p>
        </div>
      )}
    </div>
  );
}

export default WorkflowsList;
