import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";
import { CreatePhaseDto } from "@/types/requests/create-phase-dto";
import PhaseFormDialog from "@/app/(components)/PhaseFormDialog";

type PhaseFormDialogContextType = {
  isOpen: boolean;
  openDialog: (
    onSubmit: (data: CreatePhaseDto) => Promise<boolean>,
    initialValues?: CreatePhaseDto
  ) => void;
  closeDialog: () => void;
};

const PhaseFormDialogContext = createContext<
  PhaseFormDialogContextType | undefined
>(undefined);

export const PhaseFormDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const key = useRef(0);
  const [initialValues, setInitialValues] = useState<
    CreatePhaseDto | undefined
  >(undefined);
  const [onSubmit, setOnSubmit] = useState<
    (data: CreatePhaseDto) => Promise<boolean>
  >(() => async () => false);

  const openDialog = (
    onSubmit: (data: CreatePhaseDto) => Promise<boolean>,
    values?: CreatePhaseDto
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
    <PhaseFormDialogContext.Provider
      value={{ isOpen, openDialog, closeDialog }}
    >
      {children}
      <PhaseFormDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialValues={initialValues}
        onSubmit={onSubmit}
        key={key.current++}
      />
    </PhaseFormDialogContext.Provider>
  );
};

export const usePhaseFormDialog = () => {
  const context = useContext(PhaseFormDialogContext);
  if (!context) {
    throw new Error(
      "usePhaseFormDialog must be used within a PhaseFormDialogProvider"
    );
  }
  return context;
};
