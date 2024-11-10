/*
  Warnings:

  - You are about to drop the column `subject` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "subject",
ALTER COLUMN "status" SET DEFAULT false;
