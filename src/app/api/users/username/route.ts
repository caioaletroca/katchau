import { prisma } from '@/database/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { username } = await req.json();

	const user = await prisma.user.findFirst({
		where: {
			username,
		},
	});

	return new NextResponse(
		JSON.stringify({
			valid: !user,
		}),
		{
			status: 200,
		}
	);
}
