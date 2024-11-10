import { Edit, Github, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import DeployButton from "./deploy-button";
import { fetchClient } from "@/lib/fetch-client";

interface AppHeaderProps {
  appId: string;
}
const AppHeader = async ({ appId }: AppHeaderProps) => {
  const response = await fetchClient(`/applications/${+appId}`, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    return (
      <div className="h-full w-full p-6 text-center text-red-500">Error</div>
    );
  }
  return (
    <div className="flex w-full flex-col items-center justify-between md:w-auto md:flex-row">
      <h1 className="flex items-center gap-2 self-start text-2xl font-bold md:text-3xl">
        <LayoutGrid className="inline-block" />
        {data.name}
      </h1>

      <div className="mt-4 flex w-full flex-col items-end gap-4 self-end md:mt-0 md:w-auto md:flex-row">
        <Button variant="secondary" className="w-full md:w-auto">
          <Link href={`${data.gitUrl}`} className="flex items-center gap-2">
            <Github />
            Repository
          </Link>
        </Button>
        <Button
          className="flex w-full items-center gap-4 md:w-auto"
          variant="secondary"
        >
          <Edit />
          Edit
        </Button>
        <DeployButton appId={appId} />
      </div>
    </div>
  );
};

export default AppHeader;
