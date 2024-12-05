import { useUser } from "@/providers/UserProvider";
import { Button } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";

type Props = {
  onClick: () => void;
};

export const AddTaskButton = ({ onClick }: Props) => {
  const { user } = useUser();
  return (
    <Button
      colorPalette="teal"
      size="lg"
      onClick={onClick}
      alignSelf="center"
      mt="4"
      disabled={!user}
    >
      Add Task
      <GoPlus />
    </Button>
  );
};
