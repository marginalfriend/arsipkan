'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createProject(req: any) {
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

		console.log("Successfully created a project")
	} catch (e) {

		console.log(e)
		// return { message: e }

	} finally {

		await prisma.$disconnect()

	}
}