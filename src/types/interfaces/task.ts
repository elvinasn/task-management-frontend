import { TaskPriority } from "../enums/task-priority";
import { TaskStatus } from "../enums/task-status";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  phaseId: string;
}
