import { prisma } from '@/database/db';
import supabase from '@/database/supabase';
import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const token = (await getToken({ req })) as JWT;

	const posts = await prisma.post.findMany({
		where: {
			user_id: token.sub,
		},
		include: {
			images: true,
		},
	});

	return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
	const token = (await getToken({ req })) as JWT;
	const formData = await req.formData();

	// TODO: error handling

	const post = await prisma.post.create({
		data: {
			user_id: token.sub!,
			description: formData.get('description') && '',
		},
	});

	const filename = formData.get('fileName') as string;
	const extension = filename?.split('.').pop();
	const filePath = `/${token?.sub}/${post.id}.${extension}`;

	const fileResponse = await supabase.storage
		.from('posts')
		.upload(filePath, formData.get('image')!);

	await prisma.postImage.create({
		data: {
			post_id: post.id,
			url: fileResponse.data?.path ?? '',
		},
	});

	return NextResponse.json(post);
}
