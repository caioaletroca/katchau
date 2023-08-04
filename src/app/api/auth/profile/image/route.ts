import { prisma } from '@/database/db';
import supabase from '@/database/supabase';
import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const token = (await getToken({ req })) as JWT;

	const profileImage = await prisma.profileImage.findFirst({
		where: {
			user_id: token.sub,
		},
	});

	return NextResponse.json(profileImage);
}

export async function POST(req: NextRequest) {
	const token = (await getToken({ req })) as JWT;
	const formData = await req.formData();

	// Check if user already has a profile picture
	const oldProfileImage = await prisma.profileImage.findFirst({
		where: {
			user_id: token?.sub,
		},
	});
	if (oldProfileImage) {
		// Delete old records
		await supabase.storage.from('profiles').remove([oldProfileImage.url!]);

		await prisma.profileImage.delete({
			where: {
				id: oldProfileImage.id,
			},
		});
	}

	// TODO: error handling

	const profileImage = await prisma.profileImage.create({
		data: {
			user_id: token?.sub!,
		},
	});

	const filename = formData.get('fileName') as string;
	const extension = filename?.split('.').pop();
	const filePath = `/${token?.sub}/${profileImage.id}.${extension}`;

	const fileResponse = await supabase.storage
		.from('profiles')
		.upload(filePath, formData.get('image')!);

	await prisma.profileImage.update({
		where: {
			id: profileImage.id,
		},
		data: {
			url: fileResponse.data?.path ?? '',
		},
	});

	return NextResponse.json(profileImage);
}

export async function DELETE(req: NextRequest) {
	const token = await getToken({ req });

	const profileImage = await prisma.profileImage.findFirst({
		where: {
			user_id: token?.sub,
		},
	});
	if (profileImage) {
		// Delete old records
		await supabase.storage.from('profiles').remove([profileImage.url!]);

		await prisma.profileImage.delete({
			where: {
				id: profileImage.id,
			},
		});
	}

	return NextResponse.json({});
}
