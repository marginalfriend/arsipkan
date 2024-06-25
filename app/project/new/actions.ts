'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createProject(req: any) {

	console.log(req)

	// const formattedDate = `${req.date.getDate() >= 10 ? req.date.getDate() : "0" + req.date.getDate()}/${req.date.getMonth() + 1 >= 10 ? req.date.getMonth() + 1 : "0" + req.date.getMonth()}/${req.date.getFullYear()}`

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
		// return { message: "Successfully created a project." }

	} catch (e) {

		console.log(e)
		// return { message: e }

	} finally {

		await prisma.$disconnect()

	}
}