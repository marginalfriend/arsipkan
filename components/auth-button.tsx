'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"
export default function AuthButton() {
	const { data: session } = useSession()

    if (session) {
		if (session.user) {
			return (
				<div className="flex flex-row justify-start align-middle gap-6">
					<Button onClick={() => signOut()}>Sign out</Button>
				</div>
			)
		}
	} else {
		return (
			<div className="flex flex-row justify-start align-middle gap-6">
				<Button onClick={() => signIn()}>Sign in</Button>
			</div>
		)
	}
}