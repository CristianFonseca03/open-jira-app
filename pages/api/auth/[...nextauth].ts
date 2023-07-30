import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "Email" },
        password: { label: "Password", type: "password" },
        token: { label: "token", type: "Text" },
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
        if (!credentials) return null;

        const resp = await fetch(`${process.env.BACKEND_URL}auth/sign-in`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          method: "POST",
        });
        const data = await resp.json();
        if (!data.success) return null;

        return {
          id: data.user.id,
          email: credentials.email,
          user: { ...data.user, token: data.token },
          token: data.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id === user.id;
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token && token.id) {
        session.user = token.id;
      }
      return session;
    },
  },
  secret: "test",
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30,
  },
  jwt: {
    secret: "test",
    // encryption: true
    maxAge: 30,
  },
  pages: {
    signIn: "/log-in",
  },
});
