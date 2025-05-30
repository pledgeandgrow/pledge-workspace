"use client";

import { Workflow } from "@/types/workflow";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Webhook, 
  Calendar, 
  Zap, 
  Activity, 
  // MoreVertical, // Unused import removed
  Clock
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  // Function to get icon based on trigger type
  const getTriggerTypeIcon = () => {
    switch (workflow.trigger.type) {
      case "webhook":
        return <Webhook className="h-5 w-5 text-purple-500" />;
      case "schedule":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "api":
        return <Zap className="h-5 w-5 text-amber-500" />;
      case "event":
        return <Activity className="h-5 w-5 text-green-500" />;
      default:
        return <Webhook className="h-5 w-5 text-gray-500" />;
    }
  };

  // Function to get status badge
  const getStatusBadge = () => {
    switch (workflow.status) {
      case "active":
        return <Badge variant="outline" className="text-green-500 border-green-300">Actif</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Inactif</Badge>;
      case "draft":
        return <Badge variant="outline" className="text-blue-500 border-blue-300">Brouillon</Badge>;
      case "archived":
        return <Badge variant="outline" className="text-amber-500 border-amber-300">Archivé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Function to get trigger type label in French
  const getTriggerTypeLabel = () => {
    switch (workflow.trigger.type) {
      case "webhook":
        return "Webhook";
      case "schedule":
        return "Planifié";
      case "api":
        return "API";
      case "event":
        return "Événement";
      default:
        return "Inconnu";
    }
  };

  // Format the date to show how long ago it was updated
  const formattedDate = workflow.lastExecuted
    ? formatDistanceToNow(new Date(workflow.lastExecuted), {
        addSuffix: true,
        locale: fr
      })
    : "Jamais exécuté";

  return (
    <Link href={`/workflows/${workflow.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow duration-200 cursor-pointer border-gray-200 bg-background">
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <div className="flex items-center space-x-2">
            {getTriggerTypeIcon()}
            <span className="text-sm font-medium text-gray-400">{getTriggerTypeLabel()}</span>
          </div>
          {getStatusBadge()}
        </CardHeader>
        <CardContent className="pb-2">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white">{workflow.name}</h3>
          
          {workflow.description && (
            <p className="text-sm text-gray-400 line-clamp-2 mb-2">
              {workflow.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {workflow.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center text-xs text-gray-400 w-full justify-between">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Exécuté {formattedDate}</span>
            </div>
            {workflow.executions !== undefined && (
              <div className="text-xs text-gray-400">
                {workflow.executions} exécution{workflow.executions !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default WorkflowCard;
