"use server"

import prisma from "@/lib/db"
import { Bill } from "@prisma/client"


export async function createBill(request: BillRequest) {
	try {
		const result = await prisma.bill.create({
			data: request
		})

		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findAllBill() {
	try {
		const result = await prisma.bill.findMany()
		return result
	} catch (error: any) {
		console.log("Error from database: ", error)
		throw new Error(error.message)
	}
}

export async function findBillById(id: string) {
	try {
		const result = await prisma.bill.findFirst({
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

export async function updateBill(request: BillRequest) {
	try {
		const result = await prisma.bill.update({
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

export type BillRequest = {
	id?: string;
	bill_sequence: number;
	receipt_sequence: number;
	issuer_id: number;
	date: Date;
	amount: number;
	vat: number;
	receiver: string;
	project_id: string;
}