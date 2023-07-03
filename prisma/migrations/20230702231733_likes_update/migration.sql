/*
  Warnings:

  - Added the required column `user_id` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
