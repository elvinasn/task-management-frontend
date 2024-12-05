import { toaster } from "@/components/ui/toaster";
import { getApi } from "@/misc/injection";
import { Phase } from "@/types/interfaces/phase";
import { Task } from "@/types/interfaces/task";
import { CreatePhaseDto } from "@/types/requests/create-phase-dto";
import { CreateTaskDto } from "@/types/requests/create-task-dto";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const usePhase = (id: string) => {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPhase = useCallback(async (id: string) => {
    try {
      const phase = await getApi().getPhaseById(id);
      setPhase(phase);
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  const fetchTasks = useCallback(async (id: string) => {
    try {
      const tasks = await getApi().getTasksByPhaseId(id);
      setTasks(tasks);
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  const fetchInitial = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchPhase(id), fetchTasks(id)]);
    setLoading(false);
  }, [id, fetchPhase, fetchTasks]);

  useEffect(() => {
    fetchInitial();
  }, [id]);

  const addTask = useCallback(
    async (task: CreateTaskDto) => {
      try {
        const newTask = await getApi().createTask(phase!.id, task);
        setTasks((prev) => [...prev, newTask]);
        toaster.success({
          title: "Success",
          description: "Task created successfully",
        });
        return true;
      } catch (e) {
        console.log("error", e);
        toaster.error({
          title: "Error",
          description: "Failed to create task",
        });
        return false;
      }
    },
    [phase]
  );

  const editPhase = useCallback(
    async (phaseDto: CreatePhaseDto) => {
      try {
        const updatedPhase = await getApi().updatePhase(phase!.id, phaseDto);
        setPhase(updatedPhase);
        toaster.success({
          title: "Success",
          description: "Phase updated successfully",
        });
        return true;
      } catch (e) {
        console.log("error", e);
        toaster.error({
          title: "Error",
          description: "Failed to update phase",
        });
        return false;
      }
    },
    [phase]
  );

  const deletePhase = useCallback(async () => {
    try {
      await getApi().deletePhaseById(phase!.id);
      toaster.success({
        title: "Success",
        description: "Phase deleted successfully",
      });
      router.push("/");
    } catch (e) {
      console.log("error", e);
      toaster.error({
        title: "Error",
        description: "Failed to delete phase",
      });
    }
  }, [phase]);

  const editTask = useCallback(
    async (taskId: string, taskDto: CreateTaskDto) => {
      try {
        const updatedTask = await getApi().updateTask(taskId, taskDto);
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask : task))
        );
        toaster.success({
          title: "Success",
          description: "Task updated successfully",
        });
        return true;
      } catch (e) {
        console.log("error", e);
        toaster.error({
          title: "Error",
          description: "Failed to update task",
        });
        return false;
      }
    },
    []
  );

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await getApi().deleteTaskById(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toaster.success({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (e) {
      console.log("error", e);
      toaster.error({
        title: "Error",
        description: "Failed to delete task",
      });
    }
  }, []);

  return {
    phase,
    tasks,
    loading,
    addTask,
    editPhase,
    deletePhase,
    editTask,
    deleteTask,
  };
};
