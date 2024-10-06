/* eslint-disable @typescript-eslint/no-unused-vars */
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      email: string;
      name: string;
    };
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    user: {
      userEmail: string;
      userNickname: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    user: {
      userEmail: string;
      userNickname: string;
    };
  }
}
