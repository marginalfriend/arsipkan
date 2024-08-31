"use server";

import prisma from "@/lib/db";
import { z } from "zod";

export const selectOrCreateDeveloper = async (developer_name: string) => {
  const developer = await prisma.developer.findFirst({
    where: {
      name: developer_name,
    },
  });

  if (!developer) {
    const newDeveloper = await prisma.developer.create({
      data: {
        name: developer_name,
      },
    });
    return newDeveloper;
  }

  return developer;
};

export const selectOrCreateCompany = async (
  company_name: string,
  developer_id: string
) => {
  const company = await prisma.company.findFirst({
    where: {
      name: company_name,
    },
  });

  if (!company) {
    const newCompany = await prisma.company.create({
      data: {
        name: company_name,
        developer_id,
      },
    });
    return newCompany;
  }

  return company;
};

const ProjectSchema = z.object({
    developer: z.string(),
    company: z.string(),
    spkNumber: z.string(),
    clientName: z.string(),
    projectName: z.string(),
    value: z.string(),
    city: z.string(),
    date: z.string(),
  });

export const createNewProject = async (
  formData: z.infer<typeof ProjectSchema>
) => {
  const validatedData = ProjectSchema.parse(formData);
  try {
    const developer = await selectOrCreateDeveloper(validatedData.developer);
    const company = await selectOrCreateCompany(
      validatedData.company,
      developer.id
    );

    const newProject = await prisma.project.create({
      data: {
        company_id: company.id,
        project_name: validatedData.projectName,
        value: parseFloat(validatedData.value),
        date: new Date(validatedData.date),
        folder_id: "",
      },
    });

    return { success: true, project: newProject };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
};
