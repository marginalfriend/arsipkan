"use server";

import prisma from "@/lib/db";

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

export const createNewProject = async (formData: FormData) => {
//   const { project_name, value, date, company_id, location } = formData;

  // 1.
};
