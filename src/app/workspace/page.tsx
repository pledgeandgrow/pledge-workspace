import { Metadata } from "next";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { WorkspaceContent } from "@/components/workspace/WorkspaceContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tools | Pledge Workspace",
  description: "Access your productivity tools",
};

// This forces dynamic rendering to avoid issues with useSearchParams
export const dynamic = 'force-dynamic';

export default function WorkspacePage() {
  return (
    <WorkspaceLayout>
      <Suspense fallback={<div className="p-8">Loading workspace content...</div>}>
        <WorkspaceContent title="All Tools" filterType="all" />
      </Suspense>
    </WorkspaceLayout>
  );
}
