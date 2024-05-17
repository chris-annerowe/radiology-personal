/*
  Warnings:

  - You are about to drop the column `modality_name` on the `modality` table. All the data in the column will be lost.
  - The primary key for the `study` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `study_id` on the `study` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpt_code]` on the table `study` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `application_entity_title` to the `modality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpt_code` to the `study` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "modality_modality_code_key";

-- AlterTable
ALTER TABLE "modality" DROP COLUMN "modality_name",
ADD COLUMN     "application_entity_title" TEXT NOT NULL,
ADD COLUMN     "modality_id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "modality_pkey" PRIMARY KEY ("modality_id");

-- AlterTable
ALTER TABLE "study" DROP CONSTRAINT "study_pkey",
DROP COLUMN "study_id",
ADD COLUMN     "cpt_code" VARCHAR(5) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "modality_codes" (
    "modality_code" VARCHAR(10) NOT NULL,
    "modality_name" TEXT NOT NULL,
    "modality_description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "modality_codes_modality_code_key" ON "modality_codes"("modality_code");

-- CreateIndex
CREATE UNIQUE INDEX "study_cpt_code_key" ON "study"("cpt_code");
