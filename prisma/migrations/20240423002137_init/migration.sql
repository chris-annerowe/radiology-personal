-- CreateTable
CREATE TABLE "modality" (
    "modalityid" SERIAL NOT NULL,
    "modality_name" TEXT NOT NULL,
    "modality_description" TEXT NOT NULL,

    CONSTRAINT "modality_pkey" PRIMARY KEY ("modalityid")
);

-- CreateIndex
CREATE UNIQUE INDEX "modality_modality_name_key" ON "modality"("modality_name");
