import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const refreshAccessToken = async (token: any) => {
  console.log("refreshAccessToken", token);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/users/reissue`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      },
    );

    const tokens = await response.json();

    if (!response.ok) {
      throw tokens;
    }

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        console.log("authorize", credentials);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!response.ok) return null;

          const parsedResponse = await response.json();

          const accessToken = parsedResponse.accessToken;
          const refreshToken = parsedResponse.refreshToken;
          const userEmail = parsedResponse.email;
          const userNickname = parsedResponse.nickname;

          return {
            accessToken,
            refreshToken,
            userEmail,
            userNickname,
          } as any;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string);
        token.accessTokenExpires = (decodedToken?.exp || 0) * 1000;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      console.log("**** Update Refresh token ******");
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.email = token.user.userEmail;
        session.user.name = token.user.userNickname;
      }

      return session;
    },
  },
});
