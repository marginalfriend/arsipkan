"use server"

import prisma from "@/lib/db";
import { Project } from "./components/columns"
import { GOAPI_URL } from "@/lib/url";
import { ResponseMessage } from "@/types/custom-types";
import { dateFormatter } from "@/lib/utils";
import { MIME_TYPE_FOLDER, ROOT_DRIVE_FOLDER_ID } from "@/lib/req"
import { GOOGLE_DRIVE_API_URL } from "@/lib/url"
import { getAuthHeaderBearer } from "@/lib/auth-utils";

export async function getProjects() {
	var result: Project[] = [];

	try {

		(await prisma.sPK.findMany({
			include: {
				city: {
					select: {
						name: true,
					}
				},
				company: {
					select: {
						name: true
					}
				}
			}
		})).forEach(data => {
			result.push(
				{
					spkNumber: data.number,
					clientName: data.company.name,
					projectName: data.project_name,
					date: dateFormatter(data.date),
					city: data.city.name,
					value: data.value,
					remaining: data.value
				}
			)
		})

	} catch (e) {
		console.log(e)
	}

	return result
}

export async function createProject(req: any) {
	var response: ResponseMessage = {
		message: "",
		description: "",
		toastVariant: "default"
	}

	console.log(req)

	const companyObject = JSON.parse(req.company)

	try {
		const parent = await prisma.company.findFirst({
			select: {
				folder_id: true
			},
			where: {
				id: companyObject.id,
			}
		})

		if (!parent) {
			throw new Error("Company folder not found")
		}

		const parentFolderId = parent.folder_id

		const folderId = await createFolder({ projectName: req.projectName, parentFolderId: parentFolderId })

		if (!folderId) {
			throw new Error("Failed creating new drive folder")
		}

		const cityJson = JSON.parse(req.city)
		const city = await prisma.city.upsert({
			where: {
				id: cityJson.id,
				name: cityJson.name,
			},
			update: {},
			create: {
				id: cityJson.id,
				name: cityJson.name,
			}
		})


		await prisma.sPK.create({
			data: {
				number: req.spkNumber,
				company_id: companyObject.id,
				folder_id: folderId,
				project_name: req.projectName,
				value: parseInt(req.value),
				date: req.date.toISOString(),
				city_id: city.id
			}
		})


		response.message = "Berhasil membuat projek baru"
		response.description = "Projek baru dari " + req.clientName + " untuk " + req.projectName
		response.toastVariant = "default"

	} catch (e) {
		console.error(e)

		response.message = "Gagal membuat projek baru"
		response.description = "Ada kesalahan dalam pembuatan projek baru"
		response.toastVariant = "destructive"

	}

	return response
}

export async function getProvinces() {
	const provincesURL = `${GOAPI_URL}/regional/provinsi`;

	const res = await fetch(provincesURL, {
		headers: new Headers({
			"X-API-KEY": process.env.GOAPI_KEY ? process.env.GOAPI_KEY : "",
		}),
	})

	const data = await res.json()

	return data.data
}

export async function getCities(provinceId: number) {
	const citiesURL = `${GOAPI_URL}/regional/kota?provinsi_id=${provinceId}`;

	const res = await fetch(citiesURL, {
		headers: new Headers({
			"X-API-KEY": process.env.GOAPI_KEY ? process.env.GOAPI_KEY : "",
		}),
	})

	const data = await res.json()

	return data.data
}

// Create new folder and return folder id
export async function createFolder({ projectName, parentFolderId }: { projectName: string, parentFolderId: string }) {
	const fileMetadata = {
		name: projectName,
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

		if (res.status !== 200) {
			throw new Error("Google API Error: " + res.statusText)
		}

		console.log(res)

		const file = await res.json()

		return JSON.stringify(file.id) // Folder ID

	} catch (e: any) {

		console.log(e.message)

		return

	}
}

export async function getCompanies() {
	const companies = await prisma.company.findMany({
		select: {
			id: true,
			name: true,
		}
	})

	if (!companies) {
		throw new Error("Company is empty")
	}

	return companies
}