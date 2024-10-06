"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading..." : text}
    </Button>
  );
};
