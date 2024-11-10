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
  return data.latestDeployment?.argoWorkflowId ? (
    <iframe
      src={`https://34.136.41.53:32759/workflow/widgets/workflow-graphs/argo-events?name=${data.latestDeployment.argoWorkflowId}&nodeSize=32&target=_top`}
      className="mt-4 h-[630px] w-full rounded-xl"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center p-6 text-red-500">
      No visualization available
    </div>
  );
};

export default Visualization;
