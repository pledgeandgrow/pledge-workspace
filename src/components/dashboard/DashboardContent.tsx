import { DashboardMetrics } from "./DashboardMetrics";
import { RecentActivities } from "./RecentActivities";
import { UpcomingTasks } from "./UpcomingTasks";
import { QuickShortcuts } from "./QuickShortcuts";

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your workspace dashboard. Here&apos;s an overview of your current projects and activities.
        </p>
      </div>
      
      <DashboardMetrics />
      
      <QuickShortcuts />
      
      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingTasks />
        <RecentActivities />
      </div>
    </div>
  );
}
