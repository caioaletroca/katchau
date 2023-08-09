import { prisma } from '@/database/db';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	comment_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const comment = await prisma.comment.findFirst({
		where: {
			id: params.comment_id,
		},
		include: {
			user: {
				include: {
					profile_picture: true,
				},
			},
			likes: true,
		},
	});

	if (!comment) {
		return NextResponse.json(
			{ message: 'Resource not found' },
			{ status: 404 }
		);
	}

	return NextResponse.json(comment);
}

type DeleteParams = {
	comment_id: string;
};

export async function DELETE(
	req: NextRequest,
	{ params }: { params: DeleteParams }
) {
	const token = await getToken({ req });

	const comment = await prisma.comment.findFirst({
		where: {
			id: params.comment_id,
		},
	});

	// Check if exists
	if (!comment) {
		return NextResponse.json(
			{ message: 'Resource does not exists' },
			{ status: 404 }
		);
	}

	// Check if user owns comment
	if (comment.user_id !== token?.sub) {
		return NextResponse.json(
			{ message: 'Process not allowed' },
			{ status: 405 }
		);
	}

	await prisma.comment.delete({
		where: {
			id: params.comment_id,
		},
	});

	return NextResponse.json({});
}
