"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutGrid, 
  FileText, 
  Briefcase, 
  Users, 
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  count?: number;
  active?: boolean;
}

function SidebarItem({ href, icon, text, count, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{text}</span>
      </div>
      {count !== undefined && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
          {count}
        </span>
      )}
    </Link>
  );
}

interface WorkspaceSidebarProps {
  // Optional counts to avoid unused variable warnings
  counts?: {
    all: number;
  };
}

export function WorkspaceSidebar({}: WorkspaceSidebarProps) {
  const pathname = usePathname();
  
  const categories = [
    { id: "finance", name: "Finance Tools", icon: <Briefcase className="h-4 w-4 text-blue-600" /> },
    { id: "legal", name: "Legal Tools", icon: <FileText className="h-4 w-4 text-red-600" /> },
    { id: "project", name: "Project Tools", icon: <FileText className="h-4 w-4 text-orange-600" /> },
    { id: "hr", name: "HR Tools", icon: <Users className="h-4 w-4 text-purple-600" /> },
  ];

  return (
    <div className="w-64 flex-shrink-0 border-r border-border bg-background">
      <div className="flex h-screen flex-col p-4">
        <div className="space-y-1">
          <SidebarItem
            href="/workspace"
            icon={<LayoutGrid className="h-4 w-4" />}
            text="All Tools"
            active={pathname === "/workspace"}
          />
        </div>
        
        <div className="pt-4">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <SidebarItem
                key={category.id}
                href={`/workspace?filter=${category.id}`}
                icon={category.icon}
                text={category.name}
                active={pathname === `/workspace?filter=${category.id}`}
              />
            ))}
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="p-4 border-t">
          <SidebarItem
            href="/dashboard"
            icon={<Home className="h-4 w-4" />}
            text="Return to Dashboard"
            active={false}
          />
        </div>
      </div>
    </div>
  );
}
