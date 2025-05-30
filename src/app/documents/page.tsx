"use client";

import { DocumentsList } from "@/components/documents/DocumentsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

export default function DocumentsPage() {
  // Router is used for navigation in child components
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
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-500 mt-1">
            Gérez tous vos documents créés avec nos outils
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/workspace">
            <Button variant="outline" className="text-white">
              Retour au workspace
            </Button>
          </Link>
          <Link href="/workspace">
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau document
            </Button>
          </Link>
        </div>
      </div>

      {/* Documents list component */}
      <DocumentsList />
    </div>
  );
}
