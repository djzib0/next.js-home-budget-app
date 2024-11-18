import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { connectToDb } from "./mongooseUtils"
import { User } from "./models";
import {authConfig} from "@/lib/auth.config"
import Google from "next-auth/providers/google";

const login = async (credentials) => {
  try {
    connectToDb();
    // try to find user in DB
    const user = await User.findOne({username: credentials.username})
  
    // if user is not found return information that the credentials are wrong
    if (!user) {
      throw new Error("Wrong credentials.")
    }

    // if user is found, compare form password and hashed password
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

    // if the passwords is not correct
    if (!isPasswordCorrect) {
      throw new Error("Wrong password.")
    }

    // if everything is OK
    return user
  
  } catch (error) {
    console.log(error)
    throw new Error("Failed to login.")
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          console.log(user, " user in auth.js file")
          return user;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({user, account, profile})  {
      console.log(user, " user")
      console.log(account, " account")
      console.log(profile, " profile")
      if (account?.provider === 'github') {
        connectToDb();
        try {
          const user = await User.findOne({email: profile?.email});
          if (!user) {
            const newUser = new User({
              username: profile?.username,
              email: profile?.email,
              img: profile?.avatar_url,
            });

            await newUser.save();
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      if (account?.provider === 'google') {
        console.log("yeah, it's a google provider moin")
        connectToDb();
        try {
          console.log(profile, " profile moin")
          const user = await User.findOne({email: profile?.email});
          if (!user) {
            const newUser = new User({
              username: profile?.name,
              email: profile?.email,
              img: profile?.picture,
            });

            await newUser.save();
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      return true;
    },
    ...authConfig.callbacks
  }
})