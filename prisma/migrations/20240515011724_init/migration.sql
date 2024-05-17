/*
  Warnings:

  - You are about to drop the `study` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "study";

-- CreateTable
CREATE TABLE "studies" (
    "cpt_code" VARCHAR(5) NOT NULL,
    "study_name" VARCHAR(40),
    "study_description" VARCHAR,
    "price" DOUBLE PRECISION
);

-- CreateIndex
CREATE UNIQUE INDEX "studies_cpt_code_key" ON "studies"("cpt_code");
