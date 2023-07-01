import { NextRequest } from "next/server";

export function getPathname(req: NextRequest) {
	return req.nextUrl.pathname;
}
