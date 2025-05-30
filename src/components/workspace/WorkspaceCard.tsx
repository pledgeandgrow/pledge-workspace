"use client";

import Link from "next/link";
import { 
  Calendar, 
  FileText, 
  Users
} from "lucide-react";

export interface WorkspaceProps {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: number;
  documents: number;
  lastUpdated: string;
  category: string;
  color?: string;
}

interface WorkspaceCardProps {
  workspace: WorkspaceProps;
  viewMode: "grid" | "list";
}

export function WorkspaceCard({ workspace, viewMode }: WorkspaceCardProps) {

  if (viewMode === "list") {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/50">
        <div className="flex items-center gap-4">
          <div 
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md ${workspace.color || "bg-primary/10"}`}
          >
            <span className="font-medium">{workspace.name.substring(0, 2).toUpperCase()}</span>
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/tools/${workspace.id}`} className="block">
              <h3 className="font-medium truncate">{workspace.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{workspace.description}</p>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{workspace.members}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{workspace.documents}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{workspace.lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs px-2 py-1 rounded-full bg-primary text-white">{workspace.category}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-lg border border-border bg-background overflow-hidden transition-all hover:shadow-md">
      <Link href={`/tools/${workspace.id}`} className="block">
        <div className={`h-32 ${workspace.color || "bg-primary/10"}`}>
          <div className="absolute left-2 top-2">
            <span className="text-xs px-2 py-1 rounded-full bg-primary backdrop-blur-sm text-white font-medium">
              {workspace.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{workspace.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{workspace.description}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{workspace.members}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{workspace.documents}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{workspace.lastUpdated}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
