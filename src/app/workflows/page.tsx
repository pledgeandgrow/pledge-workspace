"use client";

import { WorkflowsList } from "@/components/workflows/WorkflowsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

export default function WorkflowsPage() {
  // Router is available for navigation if needed
  const [isClient, setIsClient] = useState(false);
  
  // This ensures hydration issues are avoided
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-gray-500 mt-1">
            Automatisez vos processus et connectez vos outils à des API externes
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/workspace">
            <Button variant="outline" className="text-white">
              Retour au workspace
            </Button>
          </Link>
          <Link href="/workflows/create">
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau workflow
            </Button>
          </Link>
        </div>
      </div>

      {/* Workflows list component */}
      <WorkflowsList />
    </div>
  );
}
