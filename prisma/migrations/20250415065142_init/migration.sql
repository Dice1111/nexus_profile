-- CreateTable
CREATE TABLE "test" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "test_id_key" ON "test"("id");
