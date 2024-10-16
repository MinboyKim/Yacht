import { redirect } from "next/navigation";

const Page = ({
  params,
}: {
  params: { projectName: string; appId: string };
}) => {
  redirect(
    `/projects/${params.projectName}/application/${params.appId}/overview`,
  );
};

export default Page;
