"use server"
import { getAuthHeaderBearer } from "@/lib/auth-utils"
import prisma from "@/lib/db"
import { MIME_TYPE_FOLDER, ROOT_DRIVE_FOLDER_ID } from "@/lib/constants"
import { GOOGLE_DRIVE_API_URL } from "@/lib/url"
import { ResponseMessage } from "@/types/custom-types"

export async function createDeveloper(name: string) {

	const message: ResponseMessage = {
		message: "",
		description: "",
		toastVariant: "default"
	}

	try {

		const folderId = await createDeveloperFolder(name)

		if (!folderId) {
			throw new Error("Failed while creating ")
		}

		await prisma.developer.create({
			data: {
				name: name,
				folder_id: folderId,
			}
		})

		message.message = "Berhasil membuat developer"
		message.description = "Entry developer berhasil dibuat"

		return message

	} catch (e) {

		message.message = "Gagal membuat developer"
		message.description = "Ada kesalahan dalam membuat entry developer"
		message.toastVariant = "destructive"

		return message

	}
}

export async function createDeveloperFolder(name: string) {
	const fileMetadata = {
		name: name,
		mimeType: MIME_TYPE_FOLDER,
		parents: [ROOT_DRIVE_FOLDER_ID]
	}

	const authHeader = await getAuthHeaderBearer()

	try {

		const res = await fetch(GOOGLE_DRIVE_API_URL, {
			method: 'POST',
			headers: authHeader,
			body: JSON.stringify(fileMetadata),
		});

		console.log(res)

		const file = await res.json()

		console.log(file)

		return JSON.stringify(file.id) // Folder ID

	} catch (e: any) {

		console.log(e.message)

		return

	}
}

export async function createCompany({ name, developerId }: { name: string, developerId: string }) {

	const message: ResponseMessage = {
		message: "",
		description: "",
		toastVariant: "default"
	}

	try {

		const developer = await prisma.developer.findFirst({
			select: {
				folder_id: true
			},
			where: {
				id: developerId
			}
		})

		if (!developer) {
			throw new Error("Failed creating company data.")
		}

		const developerFolderId = JSON.parse(developer.folder_id)

		console.log("Developer folder id: " + developerFolderId)

		if (!developerFolderId) {
			throw new Error("Failed while creating company data.")
		}

		const folderId = await createCompanyFolder(name, developerFolderId)

		if (!folderId) {
			throw new Error("Failed while creating company data.")
		}

		await prisma.company.create({
			data: {
				name: name,
				folder_id: folderId,
				developer_id: developerId
			}
		})

		message.message = "Berhasil membuat data perusahaan"
		message.description = "Entry data perusahaan berhasil dibuat"


	} catch (e) {

		message.message = "Gagal membuat data perusahaan"
		message.description = "Ada kesalahan dalam membuat entry data perusahaan"
		message.toastVariant = "destructive"
	}

	return message
}

export async function createCompanyFolder(name: string, parentFolderId: string) {
	const fileMetadata = {
		name: name,
		mimeType: MIME_TYPE_FOLDER,
		parents: [parentFolderId]
	}

	const authHeader = await getAuthHeaderBearer()

	try {

		const res = await fetch(GOOGLE_DRIVE_API_URL, {
			method: 'POST',
			headers: authHeader,
			body: JSON.stringify(fileMetadata),
		});

		const file = await res.json()

		console.log(file)

		if (file.error) {
			console.log(file.error)
			return
		}

		return file.id // Folder ID

	} catch (e: any) {

		console.log(e.message)

		return

	}
}

export async function getDeveloepr() {
	const companies = await prisma.developer.findMany({
		select: {
			id: true,
			name: true,
		}
	})

	if (!companies) {
		throw new Error("Developer is empty")
	}

	return companies
}