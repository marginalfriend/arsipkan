"use server"

import { createCompany } from "@/database/company";
import { createDeveloper } from "@/database/developer";
import { findAllProject } from "@/database/project";
import { ROOT_DRIVE_FOLDER_ID } from "@/lib/constants";
import { createFolder } from "@/lib/googleapi";
import { Company, Developer } from "@prisma/client";

export async function getProjects() {
	try {
		const projects = await findAllProject()
		return projects
	} catch (error: any) {
		console.error(error)
		throw new Error("Error getting project: ", error.message)
	}
}

export async function createNewDeveloper(developerName: string): Promise<Developer> {
	try {
		const folderId = await createFolder({ name: developerName, parentFolderId: ROOT_DRIVE_FOLDER_ID })
		const developer = await createDeveloper({ name: developerName, folder_id: folderId })
		return developer;
	} catch (error: any) {
		console.log(error)
		throw new Error("Error creating developer: ", error.message)
	}
}

export async function createNewCompany(companyName: string, developer: Developer): Promise<Company> {
	try {
		const folderId = await createFolder({ name: companyName, parentFolderId: developer.folder_id })
		const company = createCompany({ name: companyName, developer_id: developer.id, folder_id: folderId })
		return company
	} catch (error: any) {
		console.error(error)
		throw new Error("Error creating company: ", error.message)
	}
}

export async function createProject(req: any) {
	try {
		if (!req.developerId) {

		}
	} catch (error: any) {
		console.log(error)
		throw new Error("Error creating project: ", error.message)
	}
}