import React, {
  useState,
  useContext,
  useCallback,
  ReactNode,
  useRef,
} from "react";
import {
  Button,
  DialogBody,
  DialogRoot,
  useDisclosure,
} from "@chakra-ui/react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

interface DialogConfig {
  title: string;
  description: string;
  buttonText: string;
  inputLabel?: string;
  initialValue?: string;
  buttonVariant?: "solid-red" | "solid" | "solid-blue";
  inputHelperText?: string;
  onConfirm: (input?: string) => void;
}

interface ConfirmationDialogContextProps {
  openDialog: (config: DialogConfig) => void;
}

const ConfirmationDialogContext = React.createContext<
  ConfirmationDialogContextProps | undefined
>(undefined);

export const useConfirmationDialog = () => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmationDialog must be used within a ConfirmationDialogProvider"
    );
  }
  return context;
};

interface ConfirmationDialogProviderProps {
  children: ReactNode;
}

export const ConfirmationDialogProvider: React.FC<
  ConfirmationDialogProviderProps
> = ({ children }) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    title: "",
    description: "",
    buttonText: "",
    onConfirm: () => {},
  });
  const cancelRef = useRef<any>(null);

  const openDialog = useCallback(
    (config: DialogConfig) => {
      setDialogConfig(config);
      onOpen();
    },
    [onOpen]
  );

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      {children}
      <DialogRoot
        motionPreset="slide-in-bottom"
        onOpenChange={onClose}
        open={open}
        placement="center"
        size="md"
        role="alertdialog"
      >
        <DialogContent>
          <DialogHeader>{dialogConfig.title}</DialogHeader>
          <DialogBody>
            {dialogConfig.description}
            <DialogFooter>
              <Button ref={cancelRef} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorPalette="red"
                onClick={() => {
                  dialogConfig.onConfirm();
                  onClose();
                }}
              >
                {dialogConfig.buttonText}
              </Button>
            </DialogFooter>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </ConfirmationDialogContext.Provider>
  );
};
