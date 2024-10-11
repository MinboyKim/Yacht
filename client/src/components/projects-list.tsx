import { fetchClient } from "@/lib/fetch-client";
import Project from "./project";

const ProjectsList = async () => {
  const response = await fetchClient("/projects", {
    method: "GET",
  });
  if (!response.ok) {
    return (
      <div className="h-full w-full p-6 text-center text-red-500">Error</div>
    );
  }
  const projects = await response.json();

  if (projects.length === 0) {
    return <div className="h-full w-full p-6 text-center">No projects</div>;
  }
  return (
    <div className="flex w-full flex-col gap-10 p-8">
      {projects.map((project) => (
        <Project key={project.projectId} data={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
