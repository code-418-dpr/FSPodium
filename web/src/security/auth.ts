import { getUserById } from "@/data/user";
import authConfig from "@/security/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

import { db } from "@/lib/db";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update: update,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/auth-error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            const existingUser = await getUserById(token.sub);

            if (!existingUser) {
                return token;
            }

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    logger: {
        error(code, ...metadata) {
            if (code.message.includes("JWTSessionError")) {
                return;
            }
            console.error(code, metadata);
        },
    },
    ...authConfig,
});
