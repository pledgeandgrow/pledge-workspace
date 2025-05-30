import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText,
  Settings
} from "lucide-react";

interface FeatureProps {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const features: FeatureProps[] = [
  {
    name: "Intuitive Dashboard",
    description: "Get a comprehensive overview of your projects, tasks, and team activity in one place.",
    icon: <LayoutDashboard className="h-6 w-6" />,
  },
  {
    name: "Team Collaboration",
    description: "Work seamlessly with your team members, assign tasks, and track progress in real-time.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    name: "Project Management",
    description: "Organize projects with milestones, deadlines, and resource allocation to ensure timely delivery.",
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    name: "Integrated Messaging",
    description: "Communicate efficiently with built-in messaging and discussion threads for each project.",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    name: "Document Management",
    description: "Store, share, and collaborate on documents with version control and access permissions.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    name: "Customizable Workflows",
    description: "Tailor the workspace to your team's specific needs with customizable workflows and integrations.",
    icon: <Settings className="h-6 w-6" />,
  },
];

function Feature({ name, description, icon }: FeatureProps) {
  return (
    <div className="relative p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold leading-8 text-foreground">{name}</h3>
      <p className="mt-2 text-base leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <div className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage your projects
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Pledge Workspace combines powerful tools with an intuitive interface to help teams collaborate effectively and deliver projects on time.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3 sm:grid-cols-2">
            {features.map((feature) => (
              <Feature key={feature.name} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
