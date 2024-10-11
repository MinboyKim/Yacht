import ApplicationList from "@/components/application-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = async ({ params }: { params: { projectId: string } }) => {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <Suspense
        fallback={
          <>
            <Skeleton className="h-10 w-40 self-start" />
            <div className="flex flex-col gap-8">
              <Skeleton className="h-[216px] w-full" />
              <Skeleton className="h-[216px] w-full" />
            </div>
          </>
        }
      >
        <ApplicationList projectId={params.projectId} />
      </Suspense>
    </div>
  );
};

export default Page;
