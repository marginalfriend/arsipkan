'use server'

import { getAuthHeaderBearer } from "@/lib/auth-utils"

export async function createNewReceipt(data: any) {

	const authHeader = await getAuthHeaderBearer()
	const sheetName = 'Kwitansi_Template'

	const range = {
		diterimaDari : '!E11',
		nomorKwitansi : '!B8',
		uangSejumlah : '!E14',
		realCost : '!H25',
		untukPembayaran : '!E17',
		yangMenerima : '!H37',
		nomorSpk : '!E19',
		kotaTanggal : '!G30',
	}

	const queryParams = new URLSearchParams({
		valueInputOption: 'USER_ENTERED'
	})
	const majorDimension = 'ROWS'
	const spreadSheetId = '1_scML3y1wPePz1Mxu_b5fHo-7EkSD9C0Ep65TETLt84'

	const reqBody = {
		data: [
			{
				range : sheetName + range.diterimaDari,
				majorDimension : majorDimension,
				values : [
					[data.diterimaDari]
				]
			},
			{
				range : sheetName + range.uangSejumlah,
				majorDimension : majorDimension,
				values : [
					[data.uangSejumlah]
				]
			},
			{
				range : sheetName + range.nomorKwitansi,
				majorDimension : majorDimension,
				values : [
					[data.nomorKwitansi]
				]
			},
			{
				range : sheetName + range.realCost,
				majorDimension : majorDimension,
				values : [
					[data.realCost]
				]
			},
			{
				range : sheetName + range.untukPembayaran,
				majorDimension : majorDimension,
				values : [
					[data.untukPembayaran]
				]
			},
			{
				range : sheetName + range.yangMenerima,
				majorDimension : majorDimension,
				values : [
					[data.yangMenerima]
				]
			},
			{
				range : sheetName + range.nomorSpk,
				majorDimension : majorDimension,
				values : [
					['Nomor : ' + data.nomorSpk]
				]
			},
			{
				range : sheetName + range.kotaTanggal,
				majorDimension : majorDimension,
				values : [
					[data.kota + data.tanggalTransaksi]
				]
			}
		]
	}

	const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values:batchUpdate?${queryParams.toString()}`

	const res = await fetch(updateUrl, {
		headers: authHeader,
		method: 'POST',
		body: JSON.stringify(reqBody)
	})

	const result = await res.json()

	console.log(result)
}