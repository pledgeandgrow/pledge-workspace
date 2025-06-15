"use client";

import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
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
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 overflow-hidden">
          <DocSidebar />
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
