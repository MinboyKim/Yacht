import { auth } from "@/auth";

export const fetchClient = async (url, options) => {
  const session = await auth();

  return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
  });
};
