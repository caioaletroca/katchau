import { Prisma } from "@prisma/client";

const postWithImage = Prisma.validator<Prisma.PostArgs>()({
	include: { images: true }
});

export type PostWithImage = Prisma.PostGetPayload<typeof postWithImage>;
