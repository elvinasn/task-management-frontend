import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";
import { CreateTaskDto } from "@/types/requests/create-task-dto";
import TaskFormDialog from "@/app/(components)/TaskFormDialog";

type TaskFormDialogContextType = {
  isOpen: boolean;
  openDialog: (
    onSubmit: (data: CreateTaskDto) => Promise<boolean>,
    initialValues?: CreateTaskDto
  ) => void;
  closeDialog: () => void;
};

const TaskFormDialogContext = createContext<
  TaskFormDialogContextType | undefined
>(undefined);

export const TaskFormDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const key = useRef(0);
  const [initialValues, setInitialValues] = useState<CreateTaskDto | undefined>(
    undefined
  );
  const [onSubmit, setOnSubmit] = useState<
    (data: CreateTaskDto) => Promise<boolean>
  >(() => async () => false);

  const openDialog = (
    onSubmit: (data: CreateTaskDto) => Promise<boolean>,
    values?: CreateTaskDto
  ) => {
    setInitialValues(values);
    setIsOpen(true);
    setOnSubmit(() => onSubmit);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setInitialValues(undefined);
  };

  return (
    <TaskFormDialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
      <TaskFormDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialValues={initialValues}
        onSubmit={onSubmit}
        key={key.current++}
      />
    </TaskFormDialogContext.Provider>
  );
};

export const useTaskFormDialog = () => {
  const context = useContext(TaskFormDialogContext);
  if (!context) {
    throw new Error(
      "useTaskFormDialog must be used within a TaskFormDialogProvider"
    );
  }
  return context;
};
