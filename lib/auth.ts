import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import NextAuth, { AuthOptions, NextAuthOptions, getServerSession } from "next-auth"
import Google from "next-auth/providers/google"

export const authOptions: AuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '',
			authorization: {
				url: "https://accounts.google.com/o/oauth2/v2/auth",
				params: {
					scope: process.env.SCOPES,
				}
			},
			token: {
				url: "https://oauth2.googleapis.com/token",
			}
		})
	],

	callbacks: {
		async jwt({ token, account, profile }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {

				token.accessToken = account.access_token
				token.id = account.id

			}

			return token
		},


		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.accessToken = token.accessToken
			session.user.id = token.id

			return session
		}
	}
} satisfies NextAuthOptions

export const { handlers, signIn, signOut } = NextAuth(authOptions);

export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions)
}