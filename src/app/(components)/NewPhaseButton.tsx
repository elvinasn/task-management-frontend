import { usePhaseFormDialog } from "@/providers/PhaseFormDialogProvider";
import { useUser } from "@/providers/UserProvider";
import { CreatePhaseDto } from "@/types/requests/create-phase-dto";
import { Button } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";

type Props = {
  onSubmit: (phase: CreatePhaseDto) => Promise<boolean>;
};

export const NewPhaseButton = (props: Props) => {
  const { openDialog } = usePhaseFormDialog();

  const { user } = useUser();
  return (
    <Button
      colorPalette="blue"
      size="lg"
      onClick={() => openDialog(props.onSubmit)}
      alignSelf="center"
      disabled={!user}
    >
      Add New Phase
      <GoPlus />
    </Button>
  );
};
