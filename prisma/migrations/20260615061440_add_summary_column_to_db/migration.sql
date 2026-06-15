/*
  Warnings:

  - You are about to drop the column `transcript` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "transcript",
ADD COLUMN     "summary" TEXT DEFAULT '';
