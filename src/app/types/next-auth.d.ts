// /types/next-auth.d.ts
/* eslint-disable @typescript-eslint/no-unused-vars */

//import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}
