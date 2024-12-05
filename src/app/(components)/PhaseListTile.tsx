import { Tag } from "@/components/ui/tag";
import { Phase } from "@/types/interfaces/phase";
import { Box, HStack, VStack, Text, Link } from "@chakra-ui/react";

export const PhaseListTile = ({ phase }: { phase: Phase }) => {
  return (
    <Link href={`/phases/${phase.id}`} w="full" mb="4">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        w="full"
        bg="gray.50"
        shadow="sm"
      >
        <VStack align="start" gap="2">
          <HStack justify="space-between" w="100%">
            <Text fontSize="lg" fontWeight="semibold">
              {phase.name}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {phase.description}
          </Text>
          <Tag colorPalette="blue">
            {new Date(phase.startDate).toLocaleDateString()} -{" "}
            {new Date(phase.endDate).toLocaleDateString()}
          </Tag>
        </VStack>
      </Box>
    </Link>
  );
};
