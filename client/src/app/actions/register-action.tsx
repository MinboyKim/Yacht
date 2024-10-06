"use server";

import { redirect } from "next/navigation";

export const registerAction = async (prevState: any, formData: FormData) => {
  if (
    !formData.get("nickname") ||
    !(formData.get("nickname") as string)?.trim()
  ) {
    return {
      message: "Please enter your nickname",
    };
  }
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
  if (
    !formData.get("passwordConfirmation") ||
    !(formData.get("passwordConfirmation") as string)?.trim()
  ) {
    return {
      message: "Please confirm your password",
    };
  }
  if (formData.get("password") !== formData.get("passwordConfirmation")) {
    return {
      message: "Passwords do not match",
    };
  }

  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: formData.get("nickname"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      },
    );

    if (!response.ok)
      return {
        message: "Registration failed",
      };
    shouldRedirect = true;
  } catch (error) {
    console.error(error);
    return {
      message: "Registration failed",
    };
  }

  if (shouldRedirect) {
    redirect("/login");
  }

  return {
    message: null,
  };
};
