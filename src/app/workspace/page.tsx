import { Metadata } from "next";
import { WorkspaceContent } from "@/components/workspace/WorkspaceContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tools | Pledge Workspace",
  description: "Access your productivity tools",
};

export const dynamic = "force-dynamic";

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div className="p-8">Chargement en cours...</div>}>
      <WorkspaceContent title="All Tools" filterType="all" />
    </Suspense>
  );
}
