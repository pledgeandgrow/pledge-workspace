"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DocSidebar } from "@/components/documentation/DocSidebar";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex overflow-hidden">
        <DocSidebar />
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
