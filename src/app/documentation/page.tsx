"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DocCategory, DocSearchResult } from "@/types/documentation";
import { documentationService } from "@/services/documentationService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Search, Rocket, FileText, GitBranch, Code, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DocumentationPage() {
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DocSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // This ensures hydration issues are avoided
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await documentationService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching documentation categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isClient) {
      fetchCategories();
    }
  }, [isClient]);

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

  const getIconForCategory = (iconName?: string) => {
    switch (iconName) {
      case 'rocket':
        return <Rocket className="h-6 w-6 text-blue-500" />;
      case 'file-text':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'git-branch':
        return <GitBranch className="h-6 w-6 text-purple-500" />;
      case 'code':
        return <Code className="h-6 w-6 text-amber-500" />;
      case 'settings':
        return <Settings className="h-6 w-6 text-red-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white">Documentation</h1>
      <p className="text-gray-500 mb-8">
        Découvrez comment utiliser Pledge Workspace et toutes ses fonctionnalités
      </p>

      {/* Search */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Rechercher dans la documentation..."
              className="pl-10 bg-background text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? "Recherche..." : "Rechercher"}
          </Button>
        </form>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">Résultats de recherche</h2>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <Link key={`${result.type}-${result.id}`} href={`/documentation/${result.slug}`}>
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200 bg-background">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">{result.title}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {result.type === 'category' ? 'Catégorie' : 'Article'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{result.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-white">Catégories</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/documentation/${category.slug}`}>
                <Card className="h-full hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200 bg-background">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="p-2 rounded-full bg-background/10">
                      {getIconForCategory(category.icon)}
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2 text-white">{category.title}</CardTitle>
                    <CardDescription className="text-gray-400">{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
