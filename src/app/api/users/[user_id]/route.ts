import { prisma } from '@/database/db';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	user_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const user = await prisma.user.findFirst({
		where: {
			id: params.user_id,
		},
	});

	return NextResponse.json(user);
}
