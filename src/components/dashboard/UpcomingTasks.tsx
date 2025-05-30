import { CalendarClock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskProps {
  id: string;
  title: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  assignee: string;
}

const tasks: TaskProps[] = [
  {
    id: "task-1",
    title: "Complete project proposal",
    dueDate: "Today, 5:00 PM",
    priority: "high",
    completed: false,
    assignee: "You",
  },
  {
    id: "task-2",
    title: "Review design mockups",
    dueDate: "Tomorrow, 10:00 AM",
    priority: "medium",
    completed: false,
    assignee: "You",
  },
  {
    id: "task-3",
    title: "Team meeting preparation",
    dueDate: "Tomorrow, 2:00 PM",
    priority: "medium",
    completed: false,
    assignee: "You",
  },
  {
    id: "task-4",
    title: "Update documentation",
    dueDate: "Jun 2, 2025",
    priority: "low",
    completed: false,
    assignee: "Sarah Johnson",
  },
  {
    id: "task-5",
    title: "Client presentation",
    dueDate: "Jun 3, 2025",
    priority: "high",
    completed: false,
    assignee: "Team",
  },
];

function getPriorityColor(priority: TaskProps["priority"]) {
  switch (priority) {
    case "high":
      return "text-red-500 bg-red-50 dark:bg-red-950/50";
    case "medium":
      return "text-amber-500 bg-amber-50 dark:bg-amber-950/50";
    case "low":
      return "text-green-500 bg-green-50 dark:bg-green-950/50";
  }
}

export function UpcomingTasks() {
  return (
    <div className="rounded-lg border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Upcoming Tasks</h3>
        </div>
        <Button variant="outline" size="sm">Add Task</Button>
      </div>
      <div className="divide-y divide-border">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-4">
            <div className="flex-shrink-0">
              <button className="flex h-5 w-5 items-center justify-center rounded-full border border-input">
                {task.completed && <CheckCircle2 className="h-4 w-4 text-primary" />}
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`font-medium truncate ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </p>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                <p className="text-xs text-muted-foreground">Assigned to: {task.assignee}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-3 text-center">
        <button className="text-sm text-primary hover:underline">View all tasks</button>
      </div>
    </div>
  );
}
