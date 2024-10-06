"use server";

import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginAction = async (prevState: any, formData: FormData) => {
  if (!formData.get("email") || !(formData.get("email") as string)?.trim()) {
    return {
      message: "Please enter your email address",
    };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return {
      message: "Please enter your password",
    };
  }
  let shouldRedirect = false;
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    revalidatePath("/");
    shouldRedirect = true;
  } catch (error) {
    console.error(error);
    return {
      message: "Login failed",
    };
  }

  if (shouldRedirect) {
    redirect("/");
  }

  return {
    message: null,
  };
};
