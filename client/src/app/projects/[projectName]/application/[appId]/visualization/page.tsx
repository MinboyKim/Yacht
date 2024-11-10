import Visualization from "@/components/visualization";

const Page = ({ params }: { params: { appId: string } }) => {
  return (
    <div className="flex h-full w-full items-center justify-center text-2xl font-bold">
      <Visualization appId={params.appId} />
    </div>
  );
};

export default Page;
