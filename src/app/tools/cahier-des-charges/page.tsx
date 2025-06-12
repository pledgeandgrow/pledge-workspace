"use client";

import { CahierDesChargesEditor } from "@/components/tools/cahier-des-charges/CahierDesChargesEditor";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function CahierDesChargesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <CahierDesChargesEditor />
      </div>
      <DashboardFooter />
    </div>
  );
}
