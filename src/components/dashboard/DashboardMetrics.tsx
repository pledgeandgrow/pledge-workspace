import {
  Wrench,
  FileText,
  GitBranch
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const metrics: MetricCardProps[] = [
  {
    title: "Tools",
    value: "12",
    description: "Available tools",
    icon: <Wrench className="h-8 w-8 text-primary" />,
    trend: {
      value: "2",
      positive: true,
    },
  },
  {
    title: "Documents",
    value: "24",
    description: "Available documents",
    icon: <FileText className="h-8 w-8 text-primary" />,
    trend: {
      value: "3",
      positive: true,
    },
  },
  {
    title: "Active Workflows",
    value: "5",
    description: "Running workflows",
    icon: <GitBranch className="h-8 w-8 text-primary" />,
    trend: {
      value: "1",
      positive: false,
    },
  },
];

function MetricCard({ title, value, description, icon, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <span
                className={`text-sm font-medium ${
                  trend.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.positive ? "+" : "-"}{trend.value}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-3">{icon}</div>
      </div>
    </div>
  );
}

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
