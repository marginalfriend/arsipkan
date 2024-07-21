"use server"

import prisma from "@/lib/db"

export async function createCompany(request: CompanyRequest) {
	try {
		const result = await prisma.company.create({
			data: request
		})
		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findAllCompany() {
	try {
		const result = await prisma.company.findMany()
		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findCompanyById(id: string) {
	try {
		const result = await prisma.company.findFirst({
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

export async function updateCompany(request: CompanyRequest) {
	try {
		const result = await prisma.company.update({
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

export type CompanyRequest = {
	id?: string;
	name: string;
	folder_id: string;
	developer_id: string;
}