"use server"

import prisma from "@/lib/db"
import { Developer } from "@prisma/client"

export async function createDeveloper(request: DeveloperRequest) {
	try {
		const result = await prisma.developer.create({
			data: request
		})

		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findAllDeveloper(): Promise<Developer[]> {
	try {
		const result = await prisma.developer.findMany()
		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findDeveloperById(id: string): Promise<Developer | null> {
	try {
		const result = await prisma.developer.findFirst({
			where: {
				id: id
			}
		})
		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function updateDeveloper(request: DeveloperRequest) {
	try {
		const result = await prisma.developer.update({
			where: {
				id: request.id
			},
			data: request
		})

		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export type DeveloperRequest = {
	id?: string;
	name: string;
	folder_id: string;
}