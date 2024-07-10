/*
  Warnings:

  - Added the required column `folderId` to the `SPK` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SPK" ADD COLUMN     "folderId" TEXT NOT NULL;
