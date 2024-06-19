'use server'

import { getAuthHeaderBearer } from "@/lib/auth-utils"

async function createNewReceipt(data: any) {
	const authHeader = await getAuthHeaderBearer()

	const req = {

	}
}