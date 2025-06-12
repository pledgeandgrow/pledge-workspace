"use client";

import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  // Sample counts for the sidebar
  const counts = {
    all: 24,
    favorites: 5,
    recent: 8,
    shared: 12,
    trash: 3,
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1">
        <WorkspaceSidebar counts={counts} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
      <DashboardFooter />
    </div>
  );
}
