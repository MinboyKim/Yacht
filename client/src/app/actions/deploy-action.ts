"use server";

import { fetchClient } from "@/lib/fetch-client";
import { revalidatePath } from "next/cache";

export const deployAction = async (prevState: any, formData: FormData) => {
  try {
    const response = await fetchClient(`/deployment/${formData.get("appId")}`, {
      method: "POST",
    });
    if (!response.ok) {
      return {
        message: "Failed to deploy",
        status: "error",
      };
    }
    revalidatePath("/projects");
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to deploy",
      status: "error",
    };
  }

  return {
    message: null,
    status: "init",
  };
};
