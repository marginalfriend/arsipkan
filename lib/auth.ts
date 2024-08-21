import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import NextAuth, { AuthOptions, NextAuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import prisma from "./db"
import { Adapter } from "next-auth/adapters"

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					scope: process.env.SCOPES,
				}
			},
		})
	],

	callbacks: {
		async session({ session, token }) {

			session.accessToken = token.accessToken
			session.user.id = token.sub
			session.user.email = token.email
			session.user.name = token.name
			session.user.image = token.picture
			session.expires = token.exp as string

			return session
		}
	}
}

export const { handlers, signIn, signOut } = NextAuth(authOptions);

export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions)
}