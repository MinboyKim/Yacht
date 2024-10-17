import { fetchClient } from "@/lib/fetch-client";
import { CheckCircle, Ellipsis, LayoutGrid, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InviteDialog from "./invite-dialog";

const ApplicationList = async ({ projectName }: { projectName: string }) => {
  const response = await fetchClient("/projects", {
    method: "GET",
  });
  if (!response.ok) {
    return (
      <div className="h-full w-full p-6 text-center text-red-500">Error</div>
    );
  }
  const projects = await response.json();
  const selectedProject = projects.find(
    (project) => project.projectName === projectName,
  );
  const applications = selectedProject?.applications || [];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold md:text-4xl">
          {selectedProject?.projectName}
        </h1>
        <div className="flex items-center gap-4">
          <InviteDialog />
          <Button asChild className="flex items-center gap-4">
            <Link href={`/projects/${projectName}/create`}>
              <Plus size={24} className="hidden md:block" />
              Create Application
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex h-full w-full flex-col gap-8">
        {applications.length === 0 && (
          <div className="flex h-full w-full items-center justify-center text-2xl text-gray-500">
            No applications
          </div>
        )}
        {applications.map((application) => (
          <Link
            key={application.id}
            href={`/projects/${projectName}/application/${application.id}`}
          >
            <div className="flex w-full cursor-pointer flex-col gap-4 rounded-xl border p-8 hover:bg-gray-300 dark:hover:bg-gray-700">
              <div className="flex items-center gap-4">
                <LayoutGrid size={20} />
                <h2 className="text-2xl font-bold">{application.name}</h2>
              </div>

              <p className="text-gray-500">{application.description}</p>

              <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
                <div className="flex items-center gap-4 rounded-xl border p-4 text-green-600">
                  <CheckCircle size={20} />
                  <h3 className="text-xl font-semibold">Prepare</h3>
                </div>

                <Ellipsis
                  size={30}
                  className="rotate-90 transform md:rotate-0"
                />

                <div className="flex items-center gap-4 rounded-xl border p-4">
                  <CheckCircle size={20} />
                  <h3 className="text-xl font-semibold">Build</h3>
                </div>

                <Ellipsis
                  size={30}
                  className="rotate-90 transform md:rotate-0"
                />

                <div className="flex items-center gap-4 rounded-xl border p-4">
                  <CheckCircle size={20} />
                  <h3 className="text-xl font-semibold">Deploy</h3>
                </div>

                <Ellipsis
                  size={30}
                  className="rotate-90 transform md:rotate-0"
                />

                <div className="flex items-center gap-4 rounded-xl border p-4">
                  <CheckCircle size={20} />
                  <h3 className="text-xl font-semibold">Done</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ApplicationList;
