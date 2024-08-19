"use server"

import prisma from "@/lib/db"

export async function createEmployee(request: EmployeeRequest) {
	try {
		const result = await prisma.employee.create({
			data: request
		})

		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findAllEmployee() {
	try {
		const result = await prisma.employee.findMany()
		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findEmployeeById(id: number) {
	try {
		const result = await prisma.employee.findFirst({
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

export async function updateEmployee(request: EmployeeRequest) {
	try {
		const result = await prisma.employee.update({
			where: { id: request.id },
			data: request
		})

		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export type EmployeeRequest = {
	id?: number;
	name: string
}