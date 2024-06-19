'use server'

import { getAuthHeaderBearer } from "@/lib/auth-utils"

export async function createNewReceipt(data: any) {

	const authHeader = await getAuthHeaderBearer()
	const sheetName = 'Kwitansi_Template'
	const range = 'Kwitansi_Template!E11'
	const queryParams = new URLSearchParams({
		valueInputOption: 'USER_ENTERED'
	})

	const majorDimension = 'ROWS'
	const spreadSheetId = '1_scML3y1wPePz1Mxu_b5fHo-7EkSD9C0Ep65TETLt84'

	const req = {
		"range": range,
		"majorDimension" : majorDimension,
		"values": [
			[data.diterimaDari]
		]
	}

	const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/${range}?${queryParams.toString()}`

	const res = await fetch(updateUrl, {
		headers: authHeader,
		method: 'PUT',
		body: JSON.stringify(req)
	})

	const result = await res.json()

	console.log(result)
}