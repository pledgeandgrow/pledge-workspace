import { 
  Lightbulb, 
  BookOpen 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ResourceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  buttonText: string;
}

const resources: ResourceProps[] = [
  {
    title: "Quick Start Guide",
    description: "Learn the basics of Pledge Workspace and get up and running in minutes with our step-by-step guide.",
    icon: <Lightbulb className="h-6 w-6" />,
    href: "/guides/quick-start",
    buttonText: "Read Guide",
  },
  {
    title: "Documentation",
    description: "Explore detailed documentation on all features and tools available in the workspace.",
    icon: <BookOpen className="h-6 w-6" />,
    href: "/documentation",
    buttonText: "Browse Docs",
  },
];

function Resource({ title, description, icon, href, buttonText }: ResourceProps) {
  return (
    <div className="flex flex-col bg-background rounded-lg p-6 border border-border">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground flex-grow">{description}</p>
      <div className="mt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={href}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function GettingStarted() {
  return (
    <div className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Getting Started</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Resources to help you succeed
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore these resources to learn how to make the most of Pledge Workspace and boost your productivity.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 md:grid-cols-2">
          {resources.map((resource) => (
            <Resource key={resource.title} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
}
