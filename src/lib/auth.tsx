import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          console.error("❌ Email or password missing from credentials");
          return null;
        }

        const { data: user, error } = await supabase
          .from("User")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !user || !user.password) {
          console.error("❌ User not found or missing password:", error);
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.error("❌ Invalid password");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
};
