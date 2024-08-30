/*
  Warnings:

  - You are about to drop the column `folder_id` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `folder_id` on the `Developer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "folder_id";

-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "folder_id";
