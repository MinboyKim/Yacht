import { fetchClient } from "@/lib/fetch-client";

interface VisualizationProps {
  appId: string;
}

const Visualization = async ({ appId }: VisualizationProps) => {
  const response = await fetchClient(`/applications/${+appId}`, {
    method: "GET",
    caches: "no-cache",
  });
  const data = await response.json();
  return (
    <iframe
      src={`https://34.136.41.53:32759/workflow/widgets/workflow-graphs/argo-events?name=${data.latestDeployment.argoWorkflowId}&nodeSize=32&target=_top`}
      className="h-full w-full"
    />
  );
};

export default Visualization;
