import NextAuth from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { firestore } from "lib/firestore";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: FirestoreAdapter(firestore),

  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
    }),
  ],
});