import { prisma } from '@/database/db';
import { ForbiddenException } from '@/lib/exceptions/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type DeleteParams = {
	notification_id: string;
};

export async function DELETE(
	req: NextRequest,
	{ params }: { params: DeleteParams }
) {
	const token = await getToken({ req });

	const notification = await prisma.notification.findFirst({
		where: {
			id: params.notification_id,
		},
	});

	if (notification?.user_id !== token?.sub) {
		return ForbiddenException();
	}

	await prisma.notification.delete({
		where: {
			id: params.notification_id,
		},
	});

	return NextResponse.json({});
}
