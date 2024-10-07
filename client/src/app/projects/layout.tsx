import ProjectsList from "@/components/projects-list";
import Sidebar from "@/components/sidebar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar>
          <ProjectsList />
        </Sidebar>
        {children}
      </div>
    </SessionProvider>
  );
};

export default Layout;
