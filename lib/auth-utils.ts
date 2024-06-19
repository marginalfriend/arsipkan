'use server'

import { auth } from "@/auth"


export async function getAuthHeaderBearer() {
	const session = await auth()
	
	if (!session) {
		throw new Error("Session not found")
	}

	return new Headers({
		"Authorization": "Bearer " + session.accessToken
	})
}