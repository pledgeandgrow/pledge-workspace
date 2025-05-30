import Link from "next/link";
import {
  FileText,
  Bot,
  GitBranch,
  Settings
} from "lucide-react";

interface ShortcutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const shortcuts: ShortcutProps[] = [
  {
    title: "Workspace Tools",
    description: "Create and edit documents",
    icon: <FileText className="h-6 w-6" />,
    href: "/documents/editor",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "Documents",
    description: "Get AI-powered help",
    icon: <Bot className="h-6 w-6" />,
    href: "/ai-assistant",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    title: "Workflows",
    description: "Manage project workflows",
    icon: <GitBranch className="h-6 w-6" />,
    href: "/workflows",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  },
  {
    title: "Settings",
    description: "Configure workspace",
    icon: <Settings className="h-6 w-6" />,
    href: "/settings",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
];

export function QuickShortcuts() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <h3 className="mb-4 font-semibold">Quick Access</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {shortcuts.map((shortcut) => (
          <Link
            key={shortcut.title}
            href={shortcut.href}
            className="flex flex-col items-center rounded-lg border border-border p-4 text-center transition-colors hover:bg-muted"
          >
            <div className={`mb-2 rounded-full p-2 ${shortcut.color}`}>
              {shortcut.icon}
            </div>
            <h4 className="text-sm font-medium">{shortcut.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{shortcut.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
