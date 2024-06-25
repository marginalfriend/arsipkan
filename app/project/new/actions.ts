'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createReceipt(req: any) {
	await prisma.sPK.create({
		data: {
			number: req.number,
			clientCompanyName: req.clientCompanyName,
			projectName: req.projectName,
			value: req.value,
			date: req.date,
			cityId: req.cityId,
		}
	})
}