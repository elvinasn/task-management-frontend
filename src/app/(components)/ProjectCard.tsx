import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/UserProvider";
import { Project } from "@/types/interfaces/project";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { user } = useUser();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      mb="6"
      shadow="sm"
      bg="white"
    >
      <VStack align="start" gap="4">
        <Text fontSize="2xl" fontWeight="bold">
          {project.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {project.description}
        </Text>
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
