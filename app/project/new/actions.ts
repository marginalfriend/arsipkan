'use server'

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createProject(req: any) {
	var message;
	var description;
	var toastVariant: "default" | "destructive" | null | undefined;

	try {
		await prisma.sPK.create({
			data: {
				number: req.spkNumber,
				clientCompanyName: req.clientName,
				projectName: req.projectName,
				value: parseInt(req.value),
				date: req.date.toISOString(),
				cityId: "11.01"
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