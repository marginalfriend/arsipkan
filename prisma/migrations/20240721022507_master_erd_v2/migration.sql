/*
  Warnings:

  - You are about to drop the column `number` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[project_id]` on the table `BudgetProposal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_id]` on the table `SPK` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spk_number]` on the table `SPK` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_id]` on the table `ShopDrawing` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Project_number_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "number";

-- CreateIndex
CREATE UNIQUE INDEX "BudgetProposal_project_id_key" ON "BudgetProposal"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "SPK_project_id_key" ON "SPK"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "SPK_spk_number_key" ON "SPK"("spk_number");

-- CreateIndex
CREATE UNIQUE INDEX "ShopDrawing_project_id_key" ON "ShopDrawing"("project_id");
