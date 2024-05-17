/*
  Warnings:

  - Added the required column `study_id` to the `studies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "studies_cpt_code_key";

-- AlterTable
ALTER TABLE "studies" ADD COLUMN     "study_id" BIGINT NOT NULL,
ADD CONSTRAINT "studies_pkey" PRIMARY KEY ("study_id");
