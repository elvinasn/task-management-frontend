import { TaskPriority } from "../enums/task-priority";
import { TaskStatus } from "../enums/task-status";

export interface CreateTaskDto {
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
}
