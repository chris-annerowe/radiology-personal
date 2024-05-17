/*
  Warnings:

  - The primary key for the `modality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `modality_id` on the `modality` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[modality_code]` on the table `modality` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modality_code` to the `modality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modality" DROP CONSTRAINT "modality_pkey",
DROP COLUMN "modality_id",
ADD COLUMN     "modality_code" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "modality_modality_code_key" ON "modality"("modality_code");
