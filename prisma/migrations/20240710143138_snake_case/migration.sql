/*
  Warnings:

  - You are about to drop the column `billSequence` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `receiptSequence` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `spkId` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `clientCompanyName` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `SPK` table. All the data in the column will be lost.
  - You are about to drop the column `billId` on the `SignedInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `docId` on the `SignedInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `billId` on the `SignedReceipt` table. All the data in the column will be lost.
  - Added the required column `spk_id` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developer_id` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder_id` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder_id` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_id` to the `SPK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `SPK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder_id` to the `SPK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_name` to the `SPK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bill_id` to the `SignedInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doc_id` to the `SignedInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bill_id` to the `SignedReceipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_spkId_fkey";

-- DropForeignKey
ALTER TABLE "SPK" DROP CONSTRAINT "SPK_cityId_fkey";

-- DropForeignKey
ALTER TABLE "SignedInvoice" DROP CONSTRAINT "SignedInvoice_billId_fkey";

-- DropForeignKey
ALTER TABLE "SignedReceipt" DROP CONSTRAINT "SignedReceipt_billId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "billSequence",
DROP COLUMN "receiptSequence",
DROP COLUMN "spkId",
ADD COLUMN     "bill_sequence" SERIAL NOT NULL,
ADD COLUMN     "receipt_sequence" SERIAL NOT NULL,
ADD COLUMN     "spk_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "folderId",
ADD COLUMN     "developer_id" TEXT NOT NULL,
ADD COLUMN     "folder_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "folderId",
ADD COLUMN     "folder_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SPK" DROP COLUMN "cityId",
DROP COLUMN "clientCompanyName",
DROP COLUMN "folderId",
DROP COLUMN "projectName",
ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "folder_id" TEXT NOT NULL,
ADD COLUMN     "project_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SignedInvoice" DROP COLUMN "billId",
DROP COLUMN "docId",
ADD COLUMN     "bill_id" TEXT NOT NULL,
ADD COLUMN     "doc_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SignedReceipt" DROP COLUMN "billId",
ADD COLUMN     "bill_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SPK" ADD CONSTRAINT "SPK_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SPK" ADD CONSTRAINT "SPK_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_spk_id_fkey" FOREIGN KEY ("spk_id") REFERENCES "SPK"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedInvoice" ADD CONSTRAINT "SignedInvoice_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedReceipt" ADD CONSTRAINT "SignedReceipt_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
