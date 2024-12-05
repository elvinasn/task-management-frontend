"use client";

import { Flex } from "@chakra-ui/react";
import IndexHeader from "./(components)/IndexHeader";
import { useProjects } from "@/providers/ProjectsProvider";
import { ProjectCard } from "./(components)/ProjectCard";
import { PhasesList } from "./(components)/PhasesList";
import { NewPhaseButton } from "./(components)/NewPhaseButton";
import usePhases from "@/hooks/usePhases";
import { useProjectFormDialog } from "@/providers/ProjectFormDialogProvider";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";

export default function Home() {
  const { activeProject, updateProject, removeProject } = useProjects();
  const { phases, addPhase } = usePhases();

  const { openDialog } = useProjectFormDialog();
  const { openDialog: openDeleteDialog } = useConfirmationDialog();

  const onDelete = () => {
    openDeleteDialog({
      title: "Delete project",
      description: "Are you sure you want to delete this project?",
      buttonText: "Delete",
      onConfirm: () => {
        removeProject(activeProject!.id);
      },
    });
  };

  return (
    <Flex flexDir="column" align="center">
      <IndexHeader showProjectSettings />
      <Flex flexDir="column" mt="40px" w="full" maxW="800px" px="16px">
        {activeProject && (
          <ProjectCard
            project={activeProject}
            onEdit={() => {
              openDialog(
                (data) => updateProject(activeProject.id, data),
                activeProject
              );
            }}
            onDelete={onDelete}
          />
        )}
        <PhasesList phases={phases} />
        {activeProject && <NewPhaseButton onSubmit={addPhase} />}
      </Flex>
    </Flex>
  );
}
