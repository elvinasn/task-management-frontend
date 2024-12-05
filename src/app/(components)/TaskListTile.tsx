import { Tag } from "@/components/ui/tag";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { useTaskFormDialog } from "@/providers/TaskFormDialogProvider";
import { useUser } from "@/providers/UserProvider";
import { TaskPriority } from "@/types/enums/task-priority";
import { TaskStatus } from "@/types/enums/task-status";
import { CreateTaskDto } from "@/types/requests/create-task-dto";
import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    priority: TaskPriority;
  };
  onEdit: (data: CreateTaskDto) => Promise<boolean>;
  onDelete: (id: string) => void;
};

export const TaskListTile = ({ task, onEdit, onDelete }: Props) => {
  const { user } = useUser();

  const { openDialog } = useTaskFormDialog();

  const { openDialog: openConfirmationDialog } = useConfirmationDialog();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      mb="4"
      bg="white"
      shadow="sm"
    >
      <HStack justify="space-between">
        <Flex gap="8px">
          <Text fontSize="lg" fontWeight="semibold">
            {task.title}
          </Text>
          <IconButton
            disabled={!user}
            aria-label="Edit task"
            onClick={() =>
              openDialog(onEdit, {
                description: task.description,
                dueDate: new Date(task.dueDate),
                priority: task.priority,
                status: task.status,
                title: task.title,
              })
            }
            size="xs"
            variant="subtle"
            colorPalette="blue"
          >
            <MdEdit />
          </IconButton>
          <IconButton
            disabled={!user}
            aria-label="Delete task"
            onClick={() => {
              openConfirmationDialog({
                title: "Delete task",
                description: "Are you sure you want to delete this task?",
                buttonText: "Delete",
                onConfirm: () => {
                  onDelete(task.id);
                },
              });
            }}
            size="xs"
            colorPalette="red"
          >
            <MdDelete />
          </IconButton>
        </Flex>
        <Tag colorPalette={getPriorityColor(task.priority)}>
          {task.priority}
        </Tag>
      </HStack>
      <Text fontSize="sm" color="gray.600" mt="2">
        {task.description}
      </Text>
      <HStack justify="space-between" mt="4">
        <Text fontSize="sm" color="gray.500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Text>
        <Tag colorPalette={getStatusColor(task.status)}>{task.status}</Tag>
      </HStack>
    </Box>
  );
};

// Helpers for priority and status colors
const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.LOW:
      return "green";
    case TaskPriority.MEDIUM:
      return "yellow";
    case TaskPriority.HIGH:
      return "orange";
    case TaskPriority.CRITICAL:
      return "red";
    default:
      return "gray";
  }
};

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.OPEN:
      return "blue";
    case TaskStatus.IN_PROGRESS:
      return "purple";
    case TaskStatus.COMPLETED:
      return "green";
    case TaskStatus.CANCELLED:
      return "red";
    default:
      return "gray";
  }
};
