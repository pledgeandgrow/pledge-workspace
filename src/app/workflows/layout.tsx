"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function WorkflowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
