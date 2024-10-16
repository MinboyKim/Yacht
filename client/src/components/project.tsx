"use client";

import { cn } from "@/lib/utils";
import { Ban, ChevronUp, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface ProjectProps {
  data: {
    projectId: number;
    projectName: string;
    applications: {
      id: number;
      name: string;
      description: string;
    }[];
  };
}

const Project = ({ data }: ProjectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex cursor-pointer items-center justify-center gap-2 md:justify-normal">
        <ChevronUp
          onClick={() => setIsOpen((prev) => !prev)}
          size={20}
          className={cn(
            "transition-transform duration-300 ease-in-out",
            !isOpen && "-rotate-180 transform",
          )}
        />
        <Link href={`/projects/${data.projectName}`}>
          <h2 className="text-xl font-bold">{data.projectName}</h2>
        </Link>
      </div>

      <div className={cn("flex flex-col gap-2", isOpen ? "block" : "hidden")}>
        {data.applications.length === 0 && (
          <div className="flex items-center gap-2 text-gray-500">
            <Ban size={16} />
            No applications
          </div>
        )}
        {data.applications.map((application) => (
          <Link
            key={application.id}
            href={`/projects/${data.projectName}/application/${application.id}`}
          >
            <div
              className={cn(
                "hover:text-bg-gray-700 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md p-2 text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300 md:justify-normal",
                params.appId === application.id.toString() &&
                  "text-bg-gray-700 bg-gray-200 dark:bg-gray-800",
              )}
            >
              <LayoutGrid size={16} />
              <h3>{application.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Project;
