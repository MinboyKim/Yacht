import ProjectsList from "@/components/projects-list";
import Sidebar from "@/components/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar>
          <Suspense
            fallback={
              <div className="flex h-full w-full flex-col gap-10 p-6">
                <Skeleton className="h-7 w-full rounded-xl" />
                <Skeleton className="h-7 w-full rounded-xl" />
                <Skeleton className="h-7 w-full rounded-xl" />
              </div>
            }
          >
            <ProjectsList />
          </Suspense>
        </Sidebar>
        {children}
      </div>
    </SessionProvider>
  );
};

export default Layout;
