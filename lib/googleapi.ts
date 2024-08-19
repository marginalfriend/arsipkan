"use server"

import { getAuthHeaderBearer } from "./auth-utils"
import { MIME_TYPE_FOLDER } from "./constants"
import { GOOGLE_DRIVE_API_URL } from "./url"

export async function createFolder(request: CreateFolderRequest) {
	try {
		const fileMetadata = {
			name: request.name,
			mimeType: MIME_TYPE_FOLDER,
			parents: [request.parentFolderId]
		}

		const authHeader = await getAuthHeaderBearer()

		const res = await fetch(GOOGLE_DRIVE_API_URL, {
			method: 'POST',
			headers: authHeader,
			body: JSON.stringify(fileMetadata),
		});

		if (res.status !== 200) {
			throw new Error("Google API Error: " + res.statusText)
		}

		console.log(res)

		const file = await res.json()

		return file.id// Folder ID
	} catch (error: any) {
		console.error("Error creating folder: ", error)
		throw new Error(error.message)
	}
}

export type CreateFolderRequest = {
	name: string;
	parentFolderId?: string;
}