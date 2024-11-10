"use client";

import { Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "./ui/input";
import { deployAction } from "@/app/actions/deploy-action";

interface DeployButtonProps {
  appId: string;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="flex w-full items-center gap-4 md:w-auto"
      disabled={pending}
      type="submit"
    >
      {pending ? (
        "Loading..."
      ) : (
        <>
          <Rocket />
          Deploy
        </>
      )}
    </Button>
  );
};

const DeployButton = ({ appId }: DeployButtonProps) => {
  const [state, formAction] = useFormState(deployAction, {
    message: null,
    status: "init",
  });

  return (
    <form action={formAction} className="flex gap-4">
      <Input type="hidden" name="appId" value={appId} />
      {state.status === "error" && (
        <p className="text-red-500">{state.message}</p>
      )}
      <SubmitButton />
    </form>
  );
};

export default DeployButton;
