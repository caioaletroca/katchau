import { Prisma } from '@prisma/client';

const userWithProfilePicture = Prisma.validator<Prisma.UserArgs>()({
	include: { profile_picture: true },
});

export type UserWithProfilePicture = Prisma.UserGetPayload<
	typeof userWithProfilePicture
>;
