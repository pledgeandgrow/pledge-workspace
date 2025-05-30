"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DocCategory, DocArticle, DocSearchResult } from "@/types/documentation";
import { documentationService } from "@/services/documentationService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Search, Rocket, FileText, GitBranch, Code, Settings, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DocSidebarProps {
  className?: string;
}

export function DocSidebar({ className }: DocSidebarProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [articles, setArticles] = useState<Record<string, DocArticle[]>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DocSearchResult[]>([]);
  // State for search results
  const [, setIsSearching] = useState(false); // isSearching removed as it's unused

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await documentationService.getCategories();
        setCategories(data);
        
        // Initialize expanded state based on current path
        const expanded: Record<string, boolean> = {};
        data.forEach(category => {
          expanded[category.id] = pathname?.includes(`/documentation/${category.slug}`);
        });
        setExpandedCategories(expanded);
        
        // Fetch articles for each category
        const articlesData: Record<string, DocArticle[]> = {};
        for (const category of data) {
          const categoryArticles = await documentationService.getArticlesByCategory(category.id);
          articlesData[category.id] = categoryArticles;
        }
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching documentation categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [pathname]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      setIsSearching(true);
      const results = await documentationService.searchDocumentation(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching documentation:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const getIconForCategory = (iconName?: string) => {
    switch (iconName) {
      case 'rocket':
        return <Rocket className="h-4 w-4" />;
      case 'file-text':
        return <FileText className="h-4 w-4" />;
      case 'git-branch':
        return <GitBranch className="h-4 w-4" />;
      case 'code':
        return <Code className="h-4 w-4" />;
      case 'settings':
        return <Settings className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("w-64 flex-shrink-0 border-r border-border bg-background h-full overflow-auto", className)}>
      <div className="p-4">
        <form onSubmit={handleSearch} className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="pl-9 pr-9 bg-background text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-400"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-sm mb-2 text-gray-400">Résultats de recherche</h3>
            <ul className="space-y-1">
              {searchResults.map((result) => (
                <li key={`${result.type}-${result.id}`}>
                  <Link
                    href={
                      result.type === 'category'
                        ? `/documentation/${result.slug}`
                        : `/documentation/${result.slug}`
                    }
                    className="block py-1 px-2 rounded hover:bg-primary/10 text-sm text-white"
                    onClick={clearSearch}
                  >
                    <div className="font-medium">{result.title}</div>
                    <div className="text-xs text-gray-500 truncate">{result.excerpt}</div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="w-full text-xs text-gray-500"
              >
                Effacer les résultats
              </Button>
            </div>
          </div>
        )}

        {/* Categories and Articles */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm mb-2 text-gray-400">Documentation</h3>
          
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-5 w-4/6" />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {categories.map((category) => (
                <div key={category.id} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={cn(
                      "flex items-center w-full text-left py-1 px-2 rounded hover:bg-primary/10 text-white",
                      pathname?.includes(`/documentation/${category.slug}`) && "bg-primary/5"
                    )}
                  >
                    <span className="mr-1.5 text-gray-400">
                      {expandedCategories[category.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                    <span className="mr-1.5 text-gray-400">
                      {getIconForCategory(category.icon)}
                    </span>
                    <span className="font-medium">{category.title}</span>
                  </button>
                  
                  {expandedCategories[category.id] && articles[category.id] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {articles[category.id].map((article) => (
                        <li key={article.id}>
                          <Link
                            href={`/documentation/${article.slug}`}
                            className={cn(
                              "block py-1 px-2 rounded text-sm hover:bg-primary/10 text-white",
                              pathname === `/documentation/${article.slug}` && "bg-primary/10 text-primary"
                            )}
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocSidebar;
