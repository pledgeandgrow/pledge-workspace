"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Wrench, 
  FileText, 
  GitBranch, 
  Settings,
  BookOpen,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Workspace",
    href: "/workspace",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Workflows",
    href: "/workflows",
    icon: <GitBranch className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Documentation",
    href: "/documentation",
    icon: <BookOpen className="h-5 w-5" />,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[240px] flex-col border-r border-border bg-background">
      <div className="flex flex-col gap-2 p-4">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      
      <div className="px-4 py-2">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Support</h3>
        <div className="flex flex-col gap-2">
          {navItems.slice(4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="flex-1"></div>
      <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          <Home className="h-5 w-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
