"use client";

import { inviteAction } from "@/app/actions/invite-action";
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
import { Plus, Users, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import UserEmailForm from "./user-email-form";

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
          Invite
        </>
      )}
    </Button>
  );
};

const InviteDialog = () => {
  const [state, formAction] = useFormState(inviteAction, {
    message: null,
    status: "init",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const { projectName } = useParams();

  useEffect(() => {
    if (state.status === "success") {
      setIsOpen(false);
    }
  }, [state]);

  const handleSubmit = (email: string) => {
    if (emails.length >= 6) return;
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regEmail.test(email)) return;
    setEmails([...emails, email]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-4">
          <Users size={24} />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[350px] rounded-xl md:w-[450px]">
        <DialogHeader>
          <DialogTitle>Invite users to {projectName}</DialogTitle>
          <DialogDescription>
            Enter the emails of the users you want to invite (max 6)
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="flex flex-col gap-8 py-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <Input
            id="projectName"
            name="projectName"
            type="hidden"
            value={projectName}
          />
          <Input id="emails" name="emails" type="hidden" value={emails} />
          <UserEmailForm onSubmit={handleSubmit} />
          {emails.length > 0 && (
            <div className="grid grid-cols-2 place-items-center gap-4">
              {emails.map((email) => (
                <div
                  key={email}
                  className="flex w-fit cursor-pointer grid-cols-1 items-center gap-4 rounded-xl border border-gray-500 p-3"
                  onClick={() => setEmails(emails.filter((e) => e !== email))}
                >
                  <p className="w-[140px] truncate">{email}</p>
                  <X size={16} />
                </div>
              ))}
            </div>
          )}
          <DialogFooter className="flex items-center gap-4">
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

export default InviteDialog;
