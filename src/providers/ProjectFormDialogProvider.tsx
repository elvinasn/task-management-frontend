import ProjectFormDialog from "@/app/(components)/ProjectFormDialog";
import { CreateProjectDto } from "@/types/requests/create-project-dto";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";

type ProjectFormDialogContextType = {
  isOpen: boolean;
  openDialog: (
    onSubmit: (data: CreateProjectDto) => Promise<boolean>,
    initialValues?: CreateProjectDto
  ) => void;
  closeDialog: () => void;
};

const ProjectFormDialogContext = createContext<
  ProjectFormDialogContextType | undefined
>(undefined);

export const ProjectFormDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const key = useRef(0);
  const [initialValues, setInitialValues] = useState<
    CreateProjectDto | undefined
  >(undefined);
  const [onSubmit, setOnSubmit] = useState<
    (data: CreateProjectDto) => Promise<boolean>
  >(() => async () => false);

  const openDialog = (
    onSubmit: (data: CreateProjectDto) => Promise<boolean>,
    values?: { name: string; description: string }
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
    <ProjectFormDialogContext.Provider
      value={{ isOpen, openDialog, closeDialog }}
    >
      {children}
      <ProjectFormDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialValues={initialValues}
        onSubmit={onSubmit}
        key={key.current++}
        submitText={initialValues ? "Update" : "Create"}
      />
    </ProjectFormDialogContext.Provider>
  );
};

export const useProjectFormDialog = () => {
  const context = useContext(ProjectFormDialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
