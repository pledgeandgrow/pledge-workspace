"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  username?: string;
}

export function DashboardHeader({ username = "User" }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xl font-semibold tracking-tight">Pledge Workspace</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
          <span className="hidden text-sm font-medium md:block">
            Welcome, {username}
          </span>
        </div>
      </div>
    </header>
  );
}
