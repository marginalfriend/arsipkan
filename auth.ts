import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import NextAuth, { AuthOptions, NextAuthOptions, getServerSession } from "next-auth"
import Google from "next-auth/providers/google"

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

if (googleClientId == undefined || googleClientSecret == undefined) throw "Google credentials not found"

export const authOptions: AuthOptions = {
	providers: [
		Google({
			clientId: googleClientId,
			clientSecret: googleClientSecret,
			authorization : {
				url: "https://accounts.google.com/o/oauth2/auth",
				params : {
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