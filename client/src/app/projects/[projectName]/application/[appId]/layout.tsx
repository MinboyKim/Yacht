import AppHeader from "@/components/app-header";
import AppNavbar from "@/components/app-navbar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

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

      <Suspense
        fallback={
          <div className="flex h-[40px] w-full justify-between">
            <Skeleton className="h-[40px] w-[150px] rounded-xl" />
            <div className="flex gap-4">
              <Skeleton className="h-[40px] w-[136px] rounded-xl" />
              <Skeleton className="h-[40px] w-[98px] rounded-xl" />
              <Skeleton className="h-[40px] w-[118px] rounded-xl" />
            </div>
          </div>
        }
      >
        <AppHeader appId={params.appId} />
      </Suspense>
      <AppNavbar />
      {children}
    </div>
  );
};

export default Layout;
