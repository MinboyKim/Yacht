import AppNavbar from "@/components/app-navbar";
import DeployButton from "@/components/deploy-button";
import { Button } from "@/components/ui/button";
import { Edit, Github, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    appId: string;
    projectName: string;
  };
  children: React.ReactNode;
}

const Layout = ({ params, children }: PageProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-10">
      <Link
        className="w-fit text-base font-semibold text-gray-500 underline md:text-xl"
        href={`/projects/${params.projectName}`}
      >
        {params.projectName}
      </Link>

      <div className="flex w-full flex-col items-center justify-between md:w-auto md:flex-row">
        <h1 className="flex items-center gap-2 self-start text-2xl font-bold md:text-3xl">
          <LayoutGrid className="inline-block" />
          ML Server
        </h1>

        <div className="mt-4 flex w-full flex-col items-end gap-4 self-end md:mt-0 md:w-auto md:flex-row">
          <Button variant="secondary" className="w-full md:w-auto">
            <Link href="https://github.com" className="flex items-center gap-2">
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
          <DeployButton />
        </div>
      </div>

      <AppNavbar />

      {children}
    </div>
  );
};

export default Layout;
