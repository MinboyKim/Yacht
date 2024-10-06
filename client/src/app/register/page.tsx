"use client";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import { registerAction } from "../actions/register-action";

const Register = () => {
  const [state, formAction] = useFormState(registerAction, { message: null });

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-10">
      <Image src="/images/logo.svg" alt="Yacht" width={75} height={75} />
      <h1 className="text-center text-2xl font-semibold">Register to Yacht</h1>
      <form
        className="flex min-w-[400px] flex-col justify-center gap-6 rounded-lg border p-8"
        action={formAction}
      >
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="nickname"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            Nickname
          </Label>
          <Input
            placeholder="Nickname"
            required
            id="nickname"
            name="nickname"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            Email address
          </Label>
          <Input
            type="email"
            placeholder="Email address"
            required
            id="email"
            name="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            Password
          </Label>
          <Input
            type="password"
            placeholder="Password"
            required
            id="password"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="passwordConfirmation"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            Password Confirm
          </Label>
          <Input
            type="password"
            placeholder="Password Confirm"
            required
            id="passwordConfirmation"
            name="passwordConfirmation"
          />
        </div>
        <div className="flex flex-col gap-4">
          {state.message && (
            <p className="text-center text-red-500">{state.message}</p>
          )}
          <SubmitButton text="Register" />
          <Button variant="secondary" asChild>
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
