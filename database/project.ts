"use server"

import prisma from "@/lib/db"

export async function createProject(request: ProjectRequest) {
	try {
		const result = await prisma.project.create({
			data: request
		})

		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findAllProject(options?: any) {
	try {
		const result = await prisma.project.findMany({
			include: options
		})
		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findProjectById(id: string) {
	try {
		const result = await prisma.project.findFirst({
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

export async function updateProject(request: ProjectRequest) {
	try {
		const result = await prisma.project.update({
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

export type ProjectRequest = {
	id?: string;
	spk_id: string;
	company_id: string;
	project_name: string;
	value: number;
	date: Date;
	folder_id: string;
}