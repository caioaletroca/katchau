import { prisma } from "@/database/db";
import supabase from "@/database/supabase";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	const token = await getToken({ req });
	const formData = await req.formData();

	// TODO: Secure route, error handling
	
	const post = await prisma.post.create({
		data: {
			user_id: token?.sub,
			description: formData.get('description') && ""
		}
	});

	const filePath = `/${token?.sub}/${post.id}.jpeg`;
	const fileResponse = await supabase.storage.from('posts').upload(filePath, formData.get('image')!);

	await prisma.postImage.create({
		data: {
			post_id: post.id,
			url: fileResponse.data?.path ?? ""
		}
	});

	return NextResponse.json(post);
}
