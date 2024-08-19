/*
  Warnings:

  - You are about to drop the column `issuer` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `spk_id` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `folder_id` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `project_name` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `issuer_id` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doc_id` to the `SPK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `SPK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spk_number` to the `SPK` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_spk_id_fkey";

-- DropForeignKey
ALTER TABLE "SPK" DROP CONSTRAINT "SPK_city_id_fkey";

-- DropForeignKey
ALTER TABLE "SPK" DROP CONSTRAINT "SPK_company_id_fkey";

-- DropIndex
DROP INDEX "SPK_number_key";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "issuer",
DROP COLUMN "spk_id",
ADD COLUMN     "issuer_id" INTEGER NOT NULL,
ADD COLUMN     "project_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SPK" DROP COLUMN "city_id",
DROP COLUMN "company_id",
DROP COLUMN "folder_id",
DROP COLUMN "number",
DROP COLUMN "project_name",
DROP COLUMN "value",
ADD COLUMN     "doc_id" TEXT NOT NULL,
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "spk_number" TEXT NOT NULL;

-- DropTable
DROP TABLE "City";

-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "folder_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetProposal" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "proposal_number" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "doc_id" TEXT NOT NULL,

    CONSTRAINT "BudgetProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopDrawing" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "doc_id" TEXT NOT NULL,

    CONSTRAINT "ShopDrawing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_number_key" ON "Project"("number");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetProposal" ADD CONSTRAINT "BudgetProposal_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopDrawing" ADD CONSTRAINT "ShopDrawing_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SPK" ADD CONSTRAINT "SPK_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_issuer_id_fkey" FOREIGN KEY ("issuer_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
