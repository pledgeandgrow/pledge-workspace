"use client";

import { WorkspaceCard, WorkspaceProps } from "./WorkspaceCard";

interface WorkspaceGridProps {
  workspaces: WorkspaceProps[];
  viewMode: "grid" | "list";
}

export function WorkspaceGrid({ workspaces, viewMode }: WorkspaceGridProps) {
  if (workspaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
        <h3 className="text-lg font-medium">No workspaces found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a new workspace to get started or adjust your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className={
      viewMode === "grid" 
        ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "space-y-4"
    }>
      {workspaces.map((workspace) => (
        <WorkspaceCard 
          key={workspace.id} 
          workspace={workspace} 
          viewMode={viewMode} 
        />
      ))}
    </div>
  );
}
