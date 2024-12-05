import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRequestState } from "@/hooks/useRequestState";
import { getApi } from "@/misc/injection";
import { Project } from "@/types/interfaces/project";
import { errorText } from "@/utils/error";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./UserProvider";
import { CreateProjectDto } from "@/types/requests/create-project-dto";
import { toaster } from "@/components/ui/toaster";

interface ProjectsProviderProps {
  children: ReactNode;
}

export interface ProjectsContextProps {
  projects: Project[];
  activeProject: Project | null;
  setActiveProjectId: (projectId: string) => void;
  isLoading: boolean;
  error: string | null;
  addProject: (project: Project) => void;
  updateProject: (
    projectId: string,
    project: CreateProjectDto
  ) => Promise<boolean>;
  removeProject: (projectId: string) => void;
}

export const ProjectsContextDefaultValue: ProjectsContextProps = {
  projects: [],
  activeProject: null,
  setActiveProjectId: () => {},
  isLoading: false,
  error: null,
  addProject: () => {},
  updateProject: () => {
    return Promise.resolve(false);
  },
  removeProject: () => {},
};

const ProjectsContext = createContext<ProjectsContextProps>(
  ProjectsContextDefaultValue
);

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
  children,
}) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const [activeProjectId, setActiveProjectId] = useLocalStorage<string | null>(
    "activeProjectId",
    null
  );

  const [projects, setProjects] = useState<Project[]>([]);

  const { isLoading, setIsLoading, error, setError } = useRequestState();

  const { user } = useUser();

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
    setActiveProjectId(project.id);
  };
  const removeProject = async (projectId: string) => {
    try {
      await getApi().deleteProjectById(projectId);
      setProjects((prev) => prev.filter((e) => e.id !== projectId));
      if (activeProjectId === projectId) {
        setActiveProjectId(projects[0].id);
      }
      toaster.success({
        title: "Success",
        description: "Project removed successfully",
      });
    } catch {
      toaster.error({
        title: "Error",
        description: "Failed to remove project",
      });
    }
  };

  const updateProject = async (
    projectId: string,
    project: CreateProjectDto
  ) => {
    try {
      const updatedProject = await getApi().updateProject(projectId, project);
      setProjects((prev) => [
        ...prev.map((e) => (projectId === e.id ? updatedProject : e)),
      ]);
      if (activeProjectId === projectId) {
        setActiveProject(updatedProject);
      }
      toaster.success({
        title: "Success",
        description: "Project updated successfully",
      });
      return true;
    } catch {
      toaster.error({
        title: "Error",
        description: "Failed to update project",
      });
      return false;
    }
  };

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("getting Projects");
      const projects = await getApi().getProjects();
      console.log("projects", projects);
      setProjects(projects);
      if (!projects.map((e) => e.id).includes(activeProjectId ?? "")) {
        setActiveProjectId(null);
      }
    } catch (error) {
      setError(errorText(error));
    } finally {
      setIsLoading(false);
    }
  }, [setProjects, setError, setIsLoading]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData, user?.id]);

  useEffect(() => {
    if (
      (activeProjectId === null ||
        !projects.map((e) => e.id).includes(activeProjectId)) &&
      projects.length > 0
    ) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects, activeProjectId, setActiveProjectId]);

  useEffect(() => {
    if (activeProjectId && projects.length > 0) {
      const project = projects.find(
        (project) => project.id === activeProjectId
      );
      if (project) {
        setActiveProject(project);
      } else {
        setActiveProjectId(null);
        setActiveProject(null);
      }
    } else {
      setActiveProject(null);
    }
  }, [projects, activeProjectId, setActiveProject, setActiveProjectId]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProject,
        setActiveProjectId,
        isLoading,
        error,
        addProject,
        updateProject,
        removeProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
