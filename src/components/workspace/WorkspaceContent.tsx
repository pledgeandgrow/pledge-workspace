"use client";

import { useState, useEffect } from "react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceGrid } from "./WorkspaceGrid";
import { WorkspaceProps } from "./WorkspaceCard";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Catégories des outils
const categories = {
  finance: "Finance",
  legal: "Legal",
  project: "Project",
  hr: "HR",
};

// Fonction pour récupérer le dernier document d'une table Supabase
async function fetchLastDocument(table: string) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error(`Erreur Supabase pour ${table} :`, error);
    return null;
  }

  return data?.[0] ?? null;
}

// Props du composant
type WorkspaceContentProps = {
  title?: string;
  filterType?: string;
};

export function WorkspaceContent({ title = "All Tools", filterType = "all" }: WorkspaceContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState<"all" | "finance" | "legal" | "project" | "hr">(
    filterType as "all" | "finance" | "legal" | "project" | "hr"
  );
  const [workspaceData, setWorkspaceData] = useState<WorkspaceProps[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  // Met à jour le filtre selon l'URL
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam && ["finance", "legal", "project", "hr"].includes(filterParam)) {
      setCurrentFilter(filterParam as "finance" | "legal" | "project" | "hr");
    } else if (filterType && filterType !== "all") {
      if (["finance", "legal", "project", "hr"].includes(filterType)) {
        setCurrentFilter(filterType as "finance" | "legal" | "project" | "hr");
      }
    } else {
      setCurrentFilter("all");
    }
  }, [searchParams, filterType]);

  // Récupère les derniers documents
  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const tables = [
        { id: "devis", name: "Devis", category: categories.finance, color: "bg-blue-100 dark:bg-blue-900/30", owner: "Finance Team" },
        { id: "facture", name: "Facture", category: categories.finance, color: "bg-emerald-100 dark:bg-emerald-900/30", owner: "Finance Team" },
        { id: "cahier_des_charges", name: "Cahier des Charges", category: categories.project, color: "bg-orange-100 dark:bg-orange-900/30", owner: "Project Team" },
        { id: "convention_de_stage", name: "Convention de Stage", category: categories.hr, color: "bg-purple-100 dark:bg-purple-900/30", owner: "HR Team" },
        { id: "contrat_de_prestation", name: "Contrat de Prestation", category: categories.legal, color: "bg-indigo-100 dark:bg-indigo-900/30", owner: "Legal Team" },
        { id: "contrat_de_confidentialite", name: "Contrat de Confidentialité", category: categories.legal, color: "bg-red-100 dark:bg-red-900/30", owner: "Legal Team" },
      ];

      const results = await Promise.all(
        tables.map(async (tool) => {
          const doc = await fetchLastDocument(tool.id);
          const lastUpdated = doc?.created_at
            ? new Date(doc.created_at).toLocaleString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
              })
            : "Aucun";

          return {
            id: tool.id,
            name: tool.name,
            description: `Dernier document créé le ${lastUpdated}`,
            owner: tool.owner,
            members: 1,
            documents: doc ? 1 : 0,
            lastUpdated,
            category: tool.category,
            color: tool.color,
          };
        })
      );

      setWorkspaceData(results);
      setLoading(false);
    }

    loadData();
  }, []);

  // Filtre selon la catégorie et la recherche
  const filteredWorkspaces = workspaceData.filter((workspace) => {
    const categoryMatch =
      currentFilter === "all" || workspace.category === categories[currentFilter as keyof typeof categories];

    const searchMatch =
      searchQuery === "" ||
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

      {loading ? (
        <div className="text-center py-8 text-gray-500">Chargement des documents...</div>
      ) : filteredWorkspaces.length > 0 ? (
        <WorkspaceGrid workspaces={filteredWorkspaces} viewMode={viewMode} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-gray-500 mb-2">Aucun outil trouvé</p>
          <p className="text-sm text-gray-400">
            {searchQuery
              ? `Aucun résultat pour "${searchQuery}" dans ${currentFilter === "all" ? "toutes les catégories" : categories[currentFilter]}`
              : `Aucun outil dans la catégorie ${categories[currentFilter]}`}
          </p>
        </div>
      )}
    </div>
  );
}
