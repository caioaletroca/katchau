/*
  Warnings:

  - You are about to drop the column `hash` on the `post_images` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `profile_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post_images" DROP COLUMN "hash",
ADD COLUMN     "blur" TEXT;

-- AlterTable
ALTER TABLE "profile_images" DROP COLUMN "hash",
ADD COLUMN     "blur" TEXT;
