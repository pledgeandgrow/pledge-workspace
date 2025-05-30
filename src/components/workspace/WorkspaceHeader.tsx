"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Grid, List, Briefcase, FileText, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface WorkspaceHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  currentFilter?: "all" | "finance" | "legal" | "project" | "hr";
  onSearchChange?: (query: string) => void;
}

export function WorkspaceHeader({ 
  viewMode, 
  onViewModeChange,
  currentFilter = "all",
  onSearchChange
}: WorkspaceHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      router.push("/workspace");
    } else {
      router.push(`/workspace?filter=${value}`);
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search tools..."
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-[180px]">
            <Select 
              defaultValue={currentFilter} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="text-black bg-white border-gray-300 hover:bg-gray-50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectGroup>
                  <SelectLabel className="text-gray-500 font-medium">Categories</SelectLabel>
                  <SelectItem value="all" className="text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-gray-700" />
                      <span>All Tools</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="finance" className="text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-blue-600" />
                      <span>Finance</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="legal" className="text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-red-600" />
                      <span>Legal</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="project" className="text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-orange-600" />
                      <span>Project</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hr" className="text-black hover:bg-gray-100">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-purple-600" />
                      <span>HR</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center rounded-md border border-input bg-background">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => onViewModeChange("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
