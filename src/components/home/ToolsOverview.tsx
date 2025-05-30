import { 
  LineChart, 
  FileSpreadsheet, 
  Bot, 
  Trello, 
  Mail, 
  Calendar,
  FileSearch,
  GitBranch
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface ToolProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const tools: ToolProps[] = [
  {
    name: "Analytics Dashboard",
    description: "Track project metrics, team performance, and resource allocation with customizable charts and reports.",
    icon: <LineChart className="h-6 w-6" />,
    href: "/tools/analytics",
  },
  {
    name: "Document Management",
    description: "Create, edit, and collaborate on documents with version control and real-time co-editing.",
    icon: <FileSpreadsheet className="h-6 w-6" />,
    href: "/tools/documents",
  },
  {
    name: "AI Assistant",
    description: "Get help with tasks, generate content, and receive intelligent suggestions powered by AI.",
    icon: <Bot className="h-6 w-6" />,
    href: "/tools/ai-assistant",
  },
  {
    name: "Kanban Boards",
    description: "Visualize workflows, manage tasks, and track progress with customizable Kanban boards.",
    icon: <Trello className="h-6 w-6" />,
    href: "/tools/kanban",
  },
  {
    name: "Internal Communications",
    description: "Send messages, create discussion threads, and share updates with team members.",
    icon: <Mail className="h-6 w-6" />,
    href: "/tools/communications",
  },
  {
    name: "Resource Scheduler",
    description: "Schedule meetings, book resources, and manage team availability in a shared calendar.",
    icon: <Calendar className="h-6 w-6" />,
    href: "/tools/scheduler",
  },
  {
    name: "Knowledge Base",
    description: "Access company documentation, guides, and best practices in a searchable knowledge base.",
    icon: <FileSearch className="h-6 w-6" />,
    href: "/tools/knowledge-base",
  },
  {
    name: "Code Repository",
    description: "Manage code, track changes, and collaborate on development projects with integrated version control.",
    icon: <GitBranch className="h-6 w-6" />,
    href: "/tools/code-repository",
  }
];

function Tool({ name, description, icon, href }: ToolProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background p-6 hover:shadow-md transition-shadow">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold leading-8 text-foreground">{name}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
      <div className="mt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={href}>
            Open Tool <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function ToolsOverview() {
  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Productivity Tools</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tools to streamline your workflow
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Access all the tools you need to collaborate effectively, manage projects, and boost productivity in one integrated workspace.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
          {tools.map((tool) => (
            <Tool key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
