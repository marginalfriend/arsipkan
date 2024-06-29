'use server'

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createProject(req: any) {
	var message;
	var description;
	var toastVariant: "default" | "destructive" | null | undefined;

	try {
		// Find or create city
		const city = await prisma.city.upsert({
			where: {
				id: req.city.id,
				name: req.city.name,
			},
			update: {},
			create: {
				id: req.city.id,
				name: req.city.name,
			}
		})

		await prisma.sPK.create({
			data: {
				number: req.spkNumber,
				clientCompanyName: req.clientName,
				projectName: req.projectName,
				value: parseInt(req.value),
				date: req.date.toISOString(),
				cityId: "1"
			}
		})

		message = "Berhasil membuat projek baru"
		description = "Projek baru dari " + req.clientName + " untuk " + req.projectName
		toastVariant = "default"

	} catch (e) {

		console.log(e)

		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			message = "Gagal membuat projek baru"
			description = "Ada kesalahan dalam pembuatan projek baru"
			toastVariant = "destructive"
		}

	}

	return { message, description, toastVariant }
}