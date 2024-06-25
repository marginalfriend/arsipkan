"use server"

import { PrismaClient } from "@prisma/client"
import { Project } from "./columns"


const prisma = new PrismaClient()

export async function getProjects() {
	var result: Project[] = [];
	
	try {

		(await prisma.sPK.findMany({})).forEach(data => {
			result.push(
				{
					spkNumber: data.number,
					clientName: data.clientCompanyName,
					projectName: data.projectName,
					date: data.date.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}),
					city: data.cityId,
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