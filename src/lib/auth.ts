import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/db";
import { allowedEmails } from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const allowed = await db
        .select()
        .from(allowedEmails)
        .where(eq(allowedEmails.email, user.email))
        .limit(1);

      if (allowed.length === 0) {
        return "/access-denied";
      }

      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
