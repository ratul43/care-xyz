import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  
   session: {
    strategy: "jwt"
  },
  
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        const user = await loginUser(credentials);

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

  

      // console.log({ user, account, profile, email, credentials });

      // console.log(user);

      const isExist = await dbConnect(collections.USERS).findOne({email: user.email, 
        provider: account?.provider})

        if(isExist) {return true}

          
          const newUser = {
            provider: account.provider,
          name: user.name,
          email: user.email,
          // contact, 
          image: user?.image,
          // nid 
        };
        
        
        const result = await dbConnect(collections.USERS).insertOne(newUser)
        
      return result.acknowledged;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, user, token }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
