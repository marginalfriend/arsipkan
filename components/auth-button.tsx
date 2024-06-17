'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"
export default function AuthButton() {
	const { data: session } = useSession()

    if (session) {
		if (session.user) {
			return (
				<div className="flex flex-row justify-start align-middle w-full gap-6 px-10">
					<Button onClick={() => signOut()}>Sign out</Button>
					<p className="text-center align-middle">Signed in as {session.user.name}</p>
				</div>
			)
		}
	} else {
		return (
			<div className="flex flex-row justify-start align-middle w-full gap-6 px-10">
				<Button onClick={() => signIn()}>Sign in</Button>
				<p>Not signed in</p>
			</div>
		)
	}
}