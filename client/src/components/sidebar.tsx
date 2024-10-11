"use client";

import { cn } from "@/lib/utils";
import { PanelRightClose, PanelRightOpen, User } from "lucide-react";
import { ReactNode, useState } from "react";
import AddProjectDialog from "./add-project-dialog";
import { useSession } from "next-auth/react";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const { data } = useSession();

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
            {data?.user?.name}
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
