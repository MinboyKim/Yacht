"use client";

import { cn } from "@/lib/utils";
import { PanelRightClose, PanelRightOpen, User } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import AddProjectDialog from "./add-project-dialog";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      setUserLoading(false);
    }
  }, [data]);

  return (
    <div
      className={cn(
        "flex flex-col items-center p-4 transition-all duration-300 ease-in-out",
        open ? "w-full md:w-[250px]" : "w-full md:w-[50px]",
      )}
    >
      <div className="flex w-full justify-between border-b pb-4">
        {open ? (
          <div className="flex items-center gap-2">
            <User />
            {userLoading ? <Skeleton className="h-6 w-20" /> : data?.user?.name}
          </div>
        ) : (
          <div className="invisible"></div>
        )}
        {open ? (
          <PanelRightOpen
            onClick={() => setOpen(false)}
            className="-rotate-90 transform cursor-pointer md:rotate-0"
          />
        ) : (
          <PanelRightClose
            onClick={() => setOpen(true)}
            className={"-rotate-90 transform cursor-pointer md:rotate-0"}
          />
        )}
      </div>

      <div
        className={cn(
          "max-h-screen overflow-auto",
          open ? "w-full md:w-[250px]" : "hidden",
        )}
      >
        {children}
      </div>

      {open && <AddProjectDialog />}
    </div>
  );
};

export default Sidebar;
