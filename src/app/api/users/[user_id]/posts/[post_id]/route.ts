import { prisma } from '@/database/db';
import supabase from '@/database/supabase';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
	user_id: string;
	post_id: string;
};

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const post = await prisma.post.findFirst({
		where: {
			id: params.post_id,
			user_id: params.user_id,
		},
		include: {
			images: true,
		},
	});

	return NextResponse.json(post);
}

type DeleteParams = GetParams;

export async function DELETE(
	req: NextRequest,
	{ params }: { params: DeleteParams }
) {
	const token = await getToken({ req });

	if (token?.sub !== params.user_id) {
		return NextResponse.error();
	}

	const post = await prisma.post.findFirst({
		where: {
			id: params.post_id,
			user_id: params.user_id,
		},
		include: {
			images: true,
		},
	});

	if (!post) {
		return NextResponse.error();
	}

	await prisma.post.delete({
		where: {
			id: params.post_id,
		},
	});
	await supabase.storage
		.from('posts')
		.remove(post.images.map((image) => image.url));

	return NextResponse.json({});
}
