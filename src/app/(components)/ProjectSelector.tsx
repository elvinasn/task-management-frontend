import { createListCollection } from "@chakra-ui/react";
import { useProjects } from "@/providers/ProjectsProvider";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const ProjectSelector = () => {
  const { projects, setActiveProjectId, activeProject } = useProjects();

  const values = createListCollection({
    items: projects.map((project) => {
      return {
        label: project.name,
        value: project.id,
      };
    }),
  });
  if (projects.length < 1) {
    return null;
  }

  return (
    <SelectRoot
      collection={values}
      width="150px"
      value={[activeProject?.id ?? ""]}
      onValueChange={(e) => setActiveProjectId(e.value[0])}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Select Project" />
      </SelectTrigger>
      <SelectContent>
        {values.items.map((movie) => (
          <SelectItem item={movie} key={movie.value}>
            {movie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default ProjectSelector;
