import { VStack } from "@chakra-ui/react";
import { TaskListTile } from "./TaskListTile";
import { CreateTaskDto } from "@/types/requests/create-task-dto";

type Props = {
  tasks: Array<any>;
  onEdit: (taskId: string, data: CreateTaskDto) => Promise<boolean>;
  onDelete: (id: string) => void;
};

export const TasksList = ({ tasks, onEdit, onDelete }: Props) => {
  return (
    <VStack gap="4" align="stretch">
      {tasks.map((task) => (
        <TaskListTile
          key={task.id}
          task={task}
          onEdit={(data) => onEdit(task.id, data)}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  );
};
