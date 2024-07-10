"use server"

import { PrismaClient, Prisma } from "@prisma/client"
import { Project } from "./components/columns"
import { GOAPI_URL } from "@/lib/url";
import { ResponseMessage } from "@/types/custom-types";
import { dateFormatter } from "@/lib/utils";



const prisma = new PrismaClient()

export async function getProjects() {
	var result: Project[] = [];

	try {

		(await prisma.sPK.findMany({
			include: {
				city: {
					select: {
						name: true,
					}
				}
			}
		})).forEach(data => {
			result.push(
				{
					spkNumber: data.number,
					clientName: data.clientCompanyName,
					projectName: data.projectName,
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

	try {
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
				clientCompanyName: req.clientName,
				projectName: req.projectName,
				value: parseInt(req.value),
				date: req.date.toISOString(),
				cityId: city.id
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