'use server'

import { getAuthHeaderBearer } from "@/lib/auth-utils"


export async function createNewDoc(title: string, accessToken: any) {
	const reqBody = {
		"title": title
	}

	const authHeader = await getAuthHeaderBearer()

	const response = await fetch('https://docs.googleapis.com/v1/documents', {

		headers: authHeader,
		method: 'POST',
		body: JSON.stringify(reqBody)
	})

	const result = await response.json()

	console.log(result)
}