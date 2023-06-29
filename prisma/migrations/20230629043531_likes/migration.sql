/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "like_comment_fk";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "like_post_fk";

-- DropTable
DROP TABLE "Like";

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "owner_type" "LikeOwner" NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "like_post_fk" FOREIGN KEY ("owner_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "like_comment_fk" FOREIGN KEY ("owner_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
