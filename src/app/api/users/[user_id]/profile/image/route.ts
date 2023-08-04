import { prisma } from '@/database/db';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	user_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const profileImage = await prisma.profileImage.findFirst({
		where: {
			user_id: params.user_id,
		},
	});

	return NextResponse.json(profileImage);
}
