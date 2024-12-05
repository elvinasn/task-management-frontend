import { toaster } from "@/components/ui/toaster";
import { getApi } from "@/misc/injection";
import { useProjects } from "@/providers/ProjectsProvider";
import { Phase } from "@/types/interfaces/phase";
import { CreatePhaseDto } from "@/types/requests/create-phase-dto";
import { useCallback, useEffect, useState } from "react";

const UsePhases = () => {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { activeProject } = useProjects();

  const addPhase = useCallback(
    async (phaseDto: CreatePhaseDto) => {
      try {
        setIsLoading(true);
        const phase = await getApi().createPhase(activeProject!.id, phaseDto);
        setPhases((prevPhases) => [...prevPhases, phase]);
        setIsLoading(false);
        return true;
      } catch (e) {
        console.log("error", e);

        setIsLoading(false);
        toaster.error({
          title: "Failed",
          description: "Failed to create phase",
        });
        return false;
      }
    },
    [activeProject]
  );

  const removePhase = useCallback(async (phaseId: string) => {
    try {
      setIsLoading(true);
      await getApi().deletePhaseById(phaseId);
      setPhases((prevPhases) =>
        prevPhases.filter((phase) => phase.id !== phaseId)
      );
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toaster.error({
        title: "Failed",
        description: "Failed to delete phase",
      });
    }
  }, []);

  const updatePhase = useCallback(
    async (phaseId: string, phaseDto: CreatePhaseDto) => {
      try {
        setIsLoading(true);
        const phase = await getApi().updatePhase(phaseId, phaseDto);
        setPhases((prevPhases) =>
          prevPhases.map((p) => (p.id === phase.id ? phase : p))
        );
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        toaster.error({
          title: "Failed",
          description: "Failed to update phase",
        });
      }
    },
    []
  );

  useEffect(() => {
    const fetchPhases = async () => {
      if (!activeProject) setPhases([]);
      try {
        setIsLoading(true);
        const phases = await getApi().getPhasesByProjectId(activeProject!.id);
        setPhases(phases);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchPhases();
  }, [activeProject]);

  return {
    phases,
    addPhase,
    removePhase,
    updatePhase,
    isLoading,
  };
};

export default UsePhases;
