import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./dbConnect";
import bcrypt from "bcryptjs";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        try {
          const db = await connectDB();

          const user = await db.collection("users").findOne({
            email: credentials.email,
          });

          if (!user) return null;

          const isMatched = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatched) return null;

          return user;
        } catch (err) {
          console.log("LOGIN ERROR:", err);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        const db = await connectDB();

        if (!user?.email) return false;

        const provider = account?.provider || "credentials";

        const isExist = await db.collection("users").findOne({
          email: user.email,
          provider,
        });

        if (isExist) return true;

        await db.collection("users").insertOne({
          provider,
          name: user.name,
          email: user.email,
          image: user.image,
        });

        return true;
      } catch (err) {
        console.log("SIGNIN ERROR:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};