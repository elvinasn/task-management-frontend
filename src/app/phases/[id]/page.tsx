"use client";

import { AddTaskButton } from "@/app/(components)/AddTaskButton";
import IndexHeader from "@/app/(components)/IndexHeader";
import { PhaseCard } from "@/app/(components)/PhaseCard";
import { TasksList } from "@/app/(components)/TasksList";
import { usePhase } from "@/hooks/usePhase";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { usePhaseFormDialog } from "@/providers/PhaseFormDialogProvider";
import { useTaskFormDialog } from "@/providers/TaskFormDialogProvider";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const PhaseScreen = () => {
  const { id } = useParams();

  const {
    phase,
    tasks,
    loading,
    addTask,
    editPhase,
    deletePhase,
    editTask,
    deleteTask,
  } = usePhase(id as string);
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  const { openDialog } = useTaskFormDialog();
  const { openDialog: openPhaseDialog } = usePhaseFormDialog();
  const { openDialog: openDeleteDialog } = useConfirmationDialog();

  return (
    <Flex flexDir="column" align="center">
      <IndexHeader showProjectSettings={false} />
      <Flex flexDir="column" mt="40px" w="full" maxW="800px" px="16px">
        {phase && (
          <PhaseCard
            phase={phase}
            onDelete={() => {
              openDeleteDialog({
                title: "Delete phase",
                description: "Are you sure you want to delete this phase?",
                buttonText: "Delete",
                onConfirm: () => {
                  deletePhase();
                },
              });
            }}
            onEdit={() => {
              openPhaseDialog(editPhase, {
                description: phase.description,
                endDate: new Date(phase.endDate),
                name: phase.name,
                startDate: new Date(phase.startDate),
              });
            }}
          />
        )}
        <TasksList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
        <AddTaskButton
          onClick={() => {
            openDialog(addTask);
          }}
        />
      </Flex>
    </Flex>
  );
};

export default PhaseScreen;
