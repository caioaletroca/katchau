import { prisma } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

type GetParams = {
	user_id: string;
	post_id: string;
}

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
	const user = await prisma.user.findFirst({
		where: {
			id: params.user_id
		},
		include: {
			posts: {
				where: {
					id: params.post_id
				},
				include: {
					images: true
				}
			}
		}
	});

	return NextResponse.json(user);
}
