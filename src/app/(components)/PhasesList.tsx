import { Box, VStack } from "@chakra-ui/react";
import { PhaseListTile } from "./PhaseListTile";
import { Phase } from "@/types/interfaces/phase";

export const PhasesList = ({ phases }: { phases: Array<Phase> }) => {
  return (
    <Box>
      <VStack gap="4" align="stretch">
        {phases.map((phase) => (
          <PhaseListTile key={phase.id} phase={phase} />
        ))}
      </VStack>
    </Box>
  );
};
