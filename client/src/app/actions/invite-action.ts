"use server";

import { fetchClient } from "@/lib/fetch-client";

export const inviteAction = async (prevState: any, formData: FormData) => {
  if (!formData.get("emails") || !(formData.get("emails") as string)?.trim()) {
    return {
      message: "Please enter the emails",
      status: "error",
    };
  }
  const emails = formData.get("emails") as string;
  const parsedEmails = emails.split(",").map((email) => email.trim());
  const projectName = formData.get("projectName") as string;

  try {
    const response = await fetchClient(`/projects/${projectName}/invitation}`, {
      method: "POST",
      body: JSON.stringify({
        emails: parsedEmails,
      }),
    });
    console.log("response : ", response);
    if (!response.ok) {
      if (response.status === 403) {
        return {
          message: `You don't have permission`,
          status: "error",
        };
      }
      if (response.status === 400) {
        return {
          message: `Already invited user`,
          status: "error",
        };
      }
      return {
        message: `Failed to invite`,
        status: "error",
      };
    }
    return {
      message: "Invited",
      status: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to invite",
      status: "error",
    };
  }

  return {
    message: null,
    status: "init",
  };
};
