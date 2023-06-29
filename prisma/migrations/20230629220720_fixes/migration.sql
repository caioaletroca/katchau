/*
  Warnings:

  - Made the column `url` on table `images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "image_post_fk";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "image_user_fk";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "like_comment_fk";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "like_post_fk";

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "url" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "image_user_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "image_post_fk" FOREIGN KEY ("owner_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "like_post_fk" FOREIGN KEY ("owner_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "like_comment_fk" FOREIGN KEY ("owner_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
