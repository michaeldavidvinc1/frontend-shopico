import { ROUTES } from "@/constant";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    debug: true,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, 
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // Pastikan ini ada di .env
    },
    pages: {
        signIn: ROUTES.LOGIN,
    },
    providers: [
        Credentials({
            credentials: {
                id: {
                    type: "text",
                },
                email: {
                    type: "text",
                },
                name: {
                    type: "text",
                },
                role: {
                    type: "text",
                },
                token: {
                    type: "text",
                },
            },
            authorize: async (credentials, req) => {
                return credentials || null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.token = user.token; // Pastikan ini ada
                token.role = user.role;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.token = token.token as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};