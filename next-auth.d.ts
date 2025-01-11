import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            token: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface user {
        token: string;
        role: string;
    }
}