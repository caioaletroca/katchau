import { prisma } from '@/database/db';
import supabase from '@/database/supabase';
import blurImage from '@/utils/image/blurImage';
import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '20mb',
		},
	},
};

export async function GET(req: NextRequest) {
	const token = (await getToken({ req })) as JWT;

	const posts = await prisma.post.findMany({
		orderBy: [
			{
				created_at: 'desc',
			},
		],
		where: {
			user_id: token.sub,
		},
		include: {
			images: true,
		},
	});

	return NextResponse.json(posts);
}

const BLUR_IMAGE_SIZE = 10;

export async function POST(req: NextRequest) {
	const token = (await getToken({ req })) as JWT;
	const formData = await req.formData();

	// TODO: error handling
	const filename = formData.get('fileName') as string;
	const image = formData.get('image') as Blob;
	const extension = filename?.split('.').pop();
	const description = (formData.get('description') as string) ?? '';

	const blur = await blurImage(image, BLUR_IMAGE_SIZE);

	const post = await prisma.post.create({
		data: {
			user_id: token.sub!,
			description,
		},
	});

	const filePath = `/${token?.sub}/${post.id}.${extension}`;

	const fileResponse = await supabase.storage
		.from('posts')
		.upload(filePath, image);

	await prisma.postImage.create({
		data: {
			post_id: post.id,
			url: fileResponse.data?.path ?? '',
			blur,
		},
	});

	return NextResponse.json(post);
}
