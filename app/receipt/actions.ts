'use server'

import { getAuthHeaderBearer } from "@/lib/auth-utils"
import { KWITANSI_TEMPLATE_ID, MIME_TYPE_FOLDER } from "@/lib/constants"
import prisma from "@/lib/db"
import { GOOGLE_DOCS_API_URL, GOOGLE_DRIVE_API_URL } from "@/lib/url"
import { cityFormatter, createAbbreviation, dateFormatter, formatIDR, monthToRoman } from "@/lib/utils"
import { ResponseMessage } from "@/types/custom-types"
import { Bill } from "@prisma/client"
import { KwitansiSchema } from "./components/kwitansi-form"

export async function createNewReceipt(data: KwitansiSchema) {
	var response: ResponseMessage = {
		message: "",
		description: "",
		toastVariant: "default"
	}

	try {

		const authHeader = await getAuthHeaderBearer()

		// 1. Check billing sequence from drive folder

		const project = await prisma.sPK.findFirst({
			select: {
				number: true,
				folder_id: true,
				company: true,
				city: {
					select: {
						name: true
					}
				}
			},
			where: {
				id: data.spk
			}
		});

		if (!project) {
			throw new Error("SPK Not found")
		}

		console.log("Fetching google drive project folder id...")

		const folderId = project.folder_id
		const fetchList = await fetch(`${GOOGLE_DRIVE_API_URL}?q=%27${folderId}%27+in+parents&trashed+%3d+false`, {
			method: 'GET',
			headers: authHeader,
		});

		if (fetchList.status != 200) {
			throw new Error("Failed fetching project folder, Google API Error: " + fetchList.statusText)
		}

		const list = await fetchList.json()

		const folders = list.files.filter((file: any) => file.mimeType === MIME_TYPE_FOLDER)

		// 2. Create folder based on the latest sequence

		var folderName: string;

		if (folders.length === 0) {
			folderName = "DP"
		} else {
			folderName = `Termin ${folders.length}`
		}

		const folderMetaData = {
			name: folderName,
			mimeType: MIME_TYPE_FOLDER,
			parents: [project.folder_id]
		}

		console.log("Creating bill folder inside project folder...")

		const fetchCreateFolder = await fetch(`${GOOGLE_DRIVE_API_URL}`, {
			method: 'POST',
			headers: authHeader,
			body: JSON.stringify(folderMetaData),
		})

		if (fetchCreateFolder.status !== 200) {
			throw new Error("Failed creating bill folder, Google API Error: " + fetchCreateFolder.statusText)
		}

		const billFolder = await fetchCreateFolder.json()

		// 3. Copy file template to the new folder and return the file ID

		const fileName = "Kwitansi"
		const copyMetaData = {
			name: fileName,
			parents: [billFolder.id]
		}

		console.log("Fetching copy receipt template...")

		const fetchCopyDoc = await fetch(`${GOOGLE_DRIVE_API_URL}/${KWITANSI_TEMPLATE_ID}/copy`, {
			method: 'POST',
			headers: authHeader,
			body: JSON.stringify(copyMetaData),
		})

		if (fetchCopyDoc.status !== 200) {
			throw new Error("Google API Error: " + fetchCreateFolder.statusText)
		}

		const copiedReceipt = await fetchCopyDoc.json()

		// 4. Edit the file
		const totalCost = formatIDR(parseInt(data.amount) + parseInt(data.vat))
		const vat = formatIDR(parseInt(data.vat))
		const amount = formatIDR(parseInt(data.amount))
		const city = cityFormatter(project.city.name)
		const clientCo = createAbbreviation(project.company.name)
		const romanMonth = monthToRoman(data.date)
		const year = data.date.getFullYear()
		const billDate = dateFormatter(data.date)
		const issuer = createAbbreviation(data.issuer)
		const receiptSeq = parseInt(data.receiptSequence)

		const receiptNumber = `${data.receiptSequence}/${issuer}/SKM-${clientCo}/${romanMonth}/${year}`
		const editRequest = {
			requests: [
				{
					replaceAllText:
					{
						replaceText: receiptNumber, // New text to insert
						containsText: {
							text: "{{receiptNumber}}", // Text to edit
							matchCase: true, // Case sensitive?
						}
					}
				},
				{
					replaceAllText: {
						replaceText: project.company.name,
						containsText: {
							text: "{{clientName}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: totalCost,
						containsText: {
							text: "{{amount}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: receiptNumber,
						containsText: {
							text: "{{receiptNumber}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: data.paymentFor,
						containsText: {
							text: "{{paymentFor}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: project.number,
						containsText: {
							text: "{{spkNumber}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: amount,
						containsText: {
							text: "{{realCost}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: vat,
						containsText: {
							text: "{{vat}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: totalCost,
						containsText: {
							text: "{{totalCost}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: city, // TODO: Format city
						containsText: {
							text: "{{city}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: billDate, // TODO: Format city
						containsText: {
							text: "{{date}}",
							matchCase: true,
						}
					}
				},
				{
					replaceAllText: {
						replaceText: data.receiver, // TODO: Format city
						containsText: {
							text: "{{receiver}}",
							matchCase: true,
						}
					}
				},
			]
		}

		console.log("\n\n\n" + "=".repeat(15) + "  Start edit request  " + "=".repeat(15) + "\n")
		console.log(editRequest)
		console.log("\n" + "=".repeat(15) + "  End edit request  " + "=".repeat(15) + "\n\n\n")

		console.log("Fetching edit copied template...")

		const fetchEditDoc = await fetch(`${GOOGLE_DOCS_API_URL}/${copiedReceipt.id}:batchUpdate`, {
			method: 'POST',
			headers: authHeader,
			body: JSON.stringify(editRequest),
		})

		if (fetchCopyDoc.status != 200) {
			throw new Error("Failed editing document, Google API Error: " + fetchEditDoc.statusText)
		}

		// 5. Persisting receipt to database

		const bill = await prisma.bill.create({
			data: {
				bill_sequence: folders.length,
				receipt_sequence: receiptSeq,
				issuer: data.issuer,
				date: data.date,
				amount: parseInt(data.amount),
				vat: parseInt(data.vat),
				receiver: data.receiver,
				spk_id: data.spk,
			}
		})

		await prisma.receipt.create({
			data: {
				bill_id: bill.id,
				doc_id: copiedReceipt.id,
			}
		})

		response.message = "Berhasil menerbitkan tagihan"
	} catch (e: any) {
		console.log(e.message)

		response.message = "Gagal membuat kwitansi"
		response.description = "Ada kesalahan dalam membuat kwitansi"
		response.toastVariant = "destructive"
	}

	return response
}

export async function getReceipts() {
	var result: Bill[] = [];

	try {
		(await prisma.bill.findMany({
			include: {
				spk: {
					select: {
						project_name: true
					}
				}
			}
		})).forEach(data => {
			return result.push({
				id: data.id,
				bill_sequence: data.bill_sequence,
				receipt_sequence: data.receipt_sequence,
				issuer: data.issuer,
				date: data.date,
				amount: data.amount,
				vat: data.vat,
				receiver: data.receiver,
				spk_id: data.spk.project_name
			})
		});
	} catch (e) {
		console.error(e)
	}

	return result
}

export async function getSPKs() {
	return await prisma.sPK.findMany()
}