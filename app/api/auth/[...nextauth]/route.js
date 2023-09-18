import { createUser, getUserWithEmail, getUserWithEmailPass, userExistsWithEmail } from "@/util/db";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const { email, password } = credentials;
                return await getUserWithEmailPass(email, password)
            }
        })
    ],
    callbacks: {
        signIn: async ({ user }) => {
            const userExists = await userExistsWithEmail(user.email)
            if (!userExists) createUser(user.name, user.email, user.password, user.image)
            return true
        },
        session: async ({ session, token }) => {
            if (session) {
                const user = await getUserWithEmail(session.user.email)
                token.role = user.role
                return user
            }
        },
    },
    pages: { signIn: '/signin' },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };