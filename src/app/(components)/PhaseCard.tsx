import { Tag } from "@/components/ui/tag";
import { useUser } from "@/providers/UserProvider";
import { Phase } from "@/types/interfaces/phase";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

type Props = {
  phase: Phase;
  onEdit: () => void;
  onDelete: () => void;
};

export const PhaseCard = ({ phase, onEdit, onDelete }: Props) => {
  const { user } = useUser();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="6"
      mb="6"
      bg="gray.50"
      shadow="sm"
    >
      <VStack align="start" gap="4">
        <Text fontSize="2xl" fontWeight="bold">
          {phase.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {phase.description}
        </Text>
        <Tag colorPalette="blue">
          {new Date(phase.startDate).toLocaleDateString()} -{" "}
          {new Date(phase.endDate).toLocaleDateString()}
        </Tag>
        <Flex gap="4" alignSelf="end">
          <Button
            colorPalette="blue"
            variant="subtle"
            onClick={onEdit}
            disabled={!user}
          >
            Edit
          </Button>
          <Button
            colorPalette="red"
            variant="subtle"
            onClick={onDelete}
            disabled={!user}
          >
            Delete
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
