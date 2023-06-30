import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// TODO: Better error response

export default async function apiMiddleware(req: NextRequest) {
	const token = await getToken({ req });
	
	if (!token) {
		return new NextResponse(
			JSON.stringify({
				message: "Unauthorized",
			}),
			{
				status: 401,
				headers: { 'content-type': 'application/json' }
			}
		)
	}

	return NextResponse.next();
}
