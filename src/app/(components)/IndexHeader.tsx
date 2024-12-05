import { useUser } from "@/providers/UserProvider";
import { getUserImage } from "@/types/interfaces/user";
import { Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import ProjectSelector from "./ProjectSelector";
import { GoPlus } from "react-icons/go";
import { useProjectFormDialog } from "@/providers/ProjectFormDialogProvider";
import { getApi } from "@/misc/injection";
import { useProjects } from "@/providers/ProjectsProvider";
import { toaster } from "@/components/ui/toaster";
import { MdLogout } from "react-icons/md";

const IndexHeader = ({
  showProjectSettings = true,
}: {
  showProjectSettings: boolean;
}) => {
  const { user, logOut } = useUser();
  const { openDialog } = useProjectFormDialog();
  const { addProject } = useProjects();
  return (
    <Flex w="full" justify="space-between" bg="gray.100" p="16px">
      <Flex gap="8px" alignItems="center">
        <Image
          src={getUserImage(user?.id)}
          alt="user"
          borderRadius="full"
          boxSize="40px"
        />
        <Text display={{ base: "none", md: "block" }}>{user?.full_name}</Text>
        <IconButton
          colorPalette="red"
          onClick={() => {
            logOut();
          }}
        >
          <MdLogout />
        </IconButton>
      </Flex>
      {showProjectSettings && user && (
        <Flex gap="16px">
          <Button
            colorPalette="blue"
            w={{
              base: "50px",
              md: "auto",
            }}
            onClick={() => {
              openDialog(async (data) => {
                try {
                  const project = await getApi().createProject(data);
                  addProject(project);
                  toaster.success({
                    title: "Success",
                    description: "Project created successfully",
                  });
                  return true;
                } catch (e) {
                  toaster.error({
                    title: "Error",
                    description: "Failed to create project",
                  });
                  return false;
                }
              });
            }}
          >
            <Text display={{ base: "none", md: "block" }}>Create Project</Text>
            <GoPlus />
          </Button>
          <ProjectSelector />
        </Flex>
      )}
    </Flex>
  );
};

export default IndexHeader;
