import { 
  FileText, 
  MessageSquare, 
  GitCommit, 
  Calendar,
  CheckCircle
} from "lucide-react";

interface ActivityProps {
  id: string;
  type: "document" | "message" | "commit" | "meeting" | "task";
  title: string;
  description: string;
  time: string;
  user: {
    name: string;
    avatar?: string;
  };
}

const activities: ActivityProps[] = [
  {
    id: "1",
    type: "document",
    title: "Q2 Marketing Report",
    description: "Updated the quarterly marketing performance report",
    time: "10 minutes ago",
    user: {
      name: "Sarah Johnson",
    },
  },
  {
    id: "2",
    type: "message",
    title: "Project Discussion",
    description: "New message in the Product Development channel",
    time: "25 minutes ago",
    user: {
      name: "Michael Chen",
    },
  },
  {
    id: "3",
    type: "commit",
    title: "Frontend Updates",
    description: "Committed 5 changes to the main branch",
    time: "1 hour ago",
    user: {
      name: "Alex Rodriguez",
    },
  },
  {
    id: "4",
    type: "meeting",
    title: "Weekly Standup",
    description: "Team meeting scheduled for tomorrow at 10:00 AM",
    time: "2 hours ago",
    user: {
      name: "Jamie Taylor",
    },
  },
  {
    id: "5",
    type: "task",
    title: "Design Review",
    description: "Completed the UI design review task",
    time: "3 hours ago",
    user: {
      name: "Priya Patel",
    },
  },
];

function getActivityIcon(type: ActivityProps["type"]) {
  switch (type) {
    case "document":
      return <FileText className="h-4 w-4" />;
    case "message":
      return <MessageSquare className="h-4 w-4" />;
    case "commit":
      return <GitCommit className="h-4 w-4" />;
    case "meeting":
      return <Calendar className="h-4 w-4" />;
    case "task":
      return <CheckCircle className="h-4 w-4" />;
  }
}

export function RecentActivities() {
  return (
    <div className="rounded-lg border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="font-semibold">Recent Activities</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{activity.title}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">By {activity.user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
