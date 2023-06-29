/*
  Warnings:

  - You are about to drop the column `image` on the `posts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ImageOwner" AS ENUM ('User', 'Post');

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "owner_type" "ImageOwner" NOT NULL,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "image_user_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "image_post_fk" FOREIGN KEY ("owner_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
