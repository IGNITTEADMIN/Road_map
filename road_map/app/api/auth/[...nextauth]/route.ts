//./app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, User, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {

        const existing = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email!));

        if (existing.length === 0) {
            await db.insert(users).values({
            name: user.name!,
            email: user.email!,
            googleId: user.id,
            avatarUrl: user.image!,
            role: "user",
            });
        }

        return true;
        },

    async jwt({ token, user }) {
          // First time login
          if (user?.email) {
            token.email = user.email;
          }

          // 🔥 ALWAYS fetch latest user data
          if (token.email) {
            const dbUser = await db
              .select()
              .from(users)
              .where(eq(users.email, token.email));

            if (dbUser.length > 0) {
              token.role = dbUser[0].role ?? "user";
              token.profileCompleted = dbUser[0].profileCompleted ?? false;
            }
          }

          return token;
        },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.profileCompleted = token.profileCompleted as boolean; // ✅ ADD
      }

      return session;
    },

    async redirect({ baseUrl, url }) {
        if (url.startsWith(baseUrl)) {
        }

        return baseUrl;
      },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };