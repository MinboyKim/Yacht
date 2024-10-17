"use client";

import { addProjectAction } from "@/app/actions/add-project-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex items-center gap-4"
      disabled={pending}
    >
      {pending ? (
        "Loading..."
      ) : (
        <>
          <Plus size={16} />
          Add
        </>
      )}
    </Button>
  );
};

const AddProjectDialog = () => {
  const [state, formAction] = useFormState(addProjectAction, {
    message: null,
    status: "init",
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state.status === "success") {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-center rounded-lg border p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
          <Plus className="cursor-pointer" />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[350px] rounded-xl md:w-[450px]">
        <DialogHeader>
          <DialogTitle>Add new Project</DialogTitle>
          <DialogDescription>
            Create a new project to start building your application.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Name
            </Label>
            <Input id="name" className="col-span-3" name="name" />
          </div>
          <DialogFooter className="mt-2 flex items-center gap-4">
            {state.status === "error" && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
