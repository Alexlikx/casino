import NextAuth from "next-auth/next"
// import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb.ts"
import UserModel from "../../../../models/UserModel";
import ConnectDB from "../../../../utils/connectDB";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                name: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },

            },
            async authorize(credentials, req) {
                const { email, password } = credentials;

                await ConnectDB();
                const user = await UserModel.findOne({ email: email });
                if (!user) {
                    return null
                }
                if (user.password !== password) {
                    return null
                }
                return user
            }
        })
    ],
    secret: process.env.JWT_SECRET,
})