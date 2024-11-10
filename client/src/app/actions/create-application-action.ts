"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createApplicationAction = async (
  prevState: any,
  formData: FormData,
) => {
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return {
      message: "Please enter the application name",
      status: "error",
    };
  }

  if (
    !formData.get("description") ||
    !(formData.get("description") as string)?.trim()
  ) {
    return {
      message: "Please enter the application description",
      status: "error",
    };
  }

  if (
    !formData.get("repository") ||
    !(formData.get("repository") as string)?.trim()
  ) {
    return {
      message: "Please enter the application repository",
      status: "error",
    };
  }

  if (
    !formData.get("location") ||
    !(formData.get("location") as string)?.trim()
  ) {
    return {
      message: "Please enter the application build file location",
      status: "error",
    };
  }

  if (
    !formData.get("templateName") ||
    !(formData.get("templateName") as string)?.trim()
  ) {
    return {
      message: "Please enter the application template name",
      status: "error",
    };
  }

  if (
    !formData.get("namespace") ||
    !(formData.get("namespace") as string)?.trim()
  ) {
    return {
      message: "Please enter the application namespace",
      status: "error",
    };
  }

  if (
    !formData.get("replicaNumber") ||
    !(formData.get("replicaNumber") as string)?.trim()
  ) {
    return {
      message: "Please enter the application replica number",
      status: "error",
    };
  }

  if (!formData.get("branch") || !(formData.get("branch") as string)?.trim()) {
    return {
      message: "Please enter the application branch",
      status: "error",
    };
  }

  if (!formData.get("cpu") || !(formData.get("cpu") as string)?.trim()) {
    return {
      message: "Please enter the application CPU core",
      status: "error",
    };
  }

  if (!formData.get("mem") || !(formData.get("mem") as string)?.trim()) {
    return {
      message: "Please enter the application memory",
      status: "error",
    };
  }

  if (!formData.get("region") || !(formData.get("region") as string)?.trim()) {
    return {
      message: "Please enter the application region",
      status: "error",
    };
  }

  if (!formData.get("port") || !(formData.get("port") as string)?.trim()) {
    return {
      message: "Please enter the application port",
      status: "error",
    };
  }

  if (!formData.get("image") || !(formData.get("image") as string)?.trim()) {
    return {
      message: "Please enter the application image",
      status: "error",
    };
  }

  let shouldRedirect = false;
  try {
    const response = await fetchClient("/applications", {
      method: "POST",
      body: JSON.stringify({
        projectName: formData.get("projectName"),
        applicationName: formData.get("name"),
        description: formData.get("description"),
        gitUrl: formData.get("repository"),
        path: formData.get("location"),
        templateName: formData.get("templateName"),
        region: formData.get("region"),
        namespace: formData.get("namespace"),
        replicaNumber: formData.get("replicaNumber"),
        cpu: formData.get("cpu"),
        memory: formData.get("mem"),
        port: formData.get("port"),
        branch: formData.get("branch"),
        image: formData.get("image"),
      }),
    });
    if (!response.ok) {
      return {
        message: "Failed to create Application",
        status: "error",
      };
    }
    revalidatePath("/projects");
    shouldRedirect = true;
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to create Application",
      status: "error",
    };
  }

  if (shouldRedirect) {
    redirect("/projects");
  }

  return {
    message: null,
    status: "init",
  };
};
