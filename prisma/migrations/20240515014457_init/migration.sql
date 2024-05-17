/*
  Warnings:

  - Added the required column `modality_code` to the `studies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studies" ADD COLUMN     "modality_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "studies" ADD CONSTRAINT "studies_modality_code_fkey" FOREIGN KEY ("modality_code") REFERENCES "modality_codes"("modality_code") ON DELETE RESTRICT ON UPDATE CASCADE;
