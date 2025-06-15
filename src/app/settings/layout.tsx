"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SettingsNav } from "@/components/settings/SettingsNav";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <SettingsNav />
              <div className="flex-1">
                {children}
              </div>
            </div>
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
