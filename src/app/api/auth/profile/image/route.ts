import { prisma } from '@/database/db';
import supabase from '@/database/supabase';
import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const token = (await getToken({ req })) as JWT;
	const formData = await req.formData();

	// TODO: error handling

	const extension = formData.get('fileName')?.split('.').pop();
	const filePath = `/${token?.sub}/profile.${extension}`;

	const fileResponse = await supabase.storage
		.from('profile')
		.upload(filePath, formData.get('image')!);

	await prisma.profileImage.create({
		data: {
			user_id: token?.sub,
			url: fileResponse.data?.path ?? '',
		},
	});

	return NextResponse.json({});
}
