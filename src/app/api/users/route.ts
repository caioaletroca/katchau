import { prisma } from '@/database/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const users = await prisma.user.findMany({
		where: {
			name: {
				search: req.nextUrl.searchParams.get('name') ?? '',
			},
		},
	});

	return NextResponse.json(users);
}
