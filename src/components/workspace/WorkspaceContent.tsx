"use client";

import { useState, useEffect } from "react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceGrid } from "./WorkspaceGrid";
import { WorkspaceProps } from "./WorkspaceCard";
import { useSearchParams } from "next/navigation";

// Tool categories
const categories = {
  finance: "Finance",
  legal: "Legal",
  project: "Project",
  hr: "HR"
};

// Document generation tools
const sampleWorkspaces: WorkspaceProps[] = [
  {
    id: "devis",
    name: "Devis",
    description: "Create and manage professional estimates and quotes",
    owner: "Finance Team",
    members: 3,
    documents: 8,
    lastUpdated: "1h ago",
    category: categories.finance,
    color: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "facture",
    name: "Facture",
    description: "Generate and manage professional invoices",
    owner: "Finance Team",
    members: 3,
    documents: 5,
    lastUpdated: "30m ago",
    category: categories.finance,
    color: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    id: "cahier-des-charges",
    name: "Cahier des Charges",
    description: "Create comprehensive project specifications and requirements documents",
    owner: "Project Team",
    members: 4,
    documents: 3,
    lastUpdated: "Just now",
    category: categories.project,
    color: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: "convention-de-stage",
    name: "Convention de Stage",
    description: "Create and manage internship agreements with all required legal clauses",
    owner: "HR Team",
    members: 2,
    documents: 4,
    lastUpdated: "Just now",
    category: categories.hr,
    color: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "contrat-de-prestation",
    name: "Contrat de Prestation",
    description: "Generate professional service contracts with customizable terms and conditions",
    owner: "Legal Team",
    members: 2,
    documents: 6,
    lastUpdated: "Just now",
    category: categories.legal,
    color: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    id: "contrat-de-confidentialite",
    name: "Contrat de Confidentialité",
    description: "Create non-disclosure agreements to protect confidential information",
    owner: "Legal Team",
    members: 2,
    documents: 4,
    lastUpdated: "Just now",
    category: categories.legal,
    color: "bg-red-100 dark:bg-red-900/30",
  }
];

// Define proper props for the component
type WorkspaceContentProps = {
  title?: string;
  filterType?: string;
};

export function WorkspaceContent({ title = "All Tools", filterType = "all" }: WorkspaceContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState<"all" | "finance" | "legal" | "project" | "hr">(filterType as "all" | "finance" | "legal" | "project" | "hr");
  
  const searchParams = useSearchParams();
  
  // Update filter based on URL parameters
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam && ["finance", "legal", "project", "hr"].includes(filterParam)) {
      setCurrentFilter(filterParam as "finance" | "legal" | "project" | "hr");
    } else if (filterType && filterType !== "all") {
      // Use the filterType prop if provided and valid
      if (["finance", "legal", "project", "hr"].includes(filterType)) {
        setCurrentFilter(filterType as "finance" | "legal" | "project" | "hr");
      }
    } else {
      setCurrentFilter("all");
    }
  }, [searchParams, filterType]);
  
  // Filter workspaces based on category and search query
  const filteredWorkspaces = sampleWorkspaces.filter(workspace => {
    // First filter by category
    const categoryMatch = currentFilter === "all" || 
      workspace.category === categories[currentFilter as keyof typeof categories];
    
    // Then filter by search query if one exists
    const searchMatch = searchQuery === "" || 
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      workspace.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <WorkspaceHeader 
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
        currentFilter={currentFilter}
        onSearchChange={setSearchQuery}
      />
      {filteredWorkspaces.length > 0 ? (
        <WorkspaceGrid 
          workspaces={filteredWorkspaces} 
          viewMode={viewMode} 
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-gray-500 mb-2">No tools found</p>
          <p className="text-sm text-gray-400">
            {searchQuery ? 
              `No results for "${searchQuery}" in ${currentFilter === "all" ? "all categories" : categories[currentFilter]}`
              : `No tools in the ${currentFilter} category`
            }
          </p>
        </div>
      )}
    </div>
  );
}
