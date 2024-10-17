"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidatePath } from "next/cache";

export const addProjectAction = async (prevState: any, formData: FormData) => {
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return {
      message: "Please enter the project name",
      status: "error",
    };
  }

  try {
    const response = await fetchClient("/projects", {
      method: "POST",
      body: JSON.stringify({
        projectName: formData.get("name"),
      }),
    });
    if (!response.ok) {
      if (response.status === 400) {
        return {
          message: "Only alphanumeric characters are allowed",
          status: "error",
        };
      }
      return {
        message: "Failed to add project",
        status: "error",
      };
    }
    revalidatePath("/projects");
    return {
      message: "Project added",
      status: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to create project",
      status: "error",
    };
  }

  return {
    message: null,
    status: "init",
  };
};
