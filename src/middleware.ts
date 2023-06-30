import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

import apiMiddleware from './middlewares/apiMiddleware';

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
	if(req.nextUrl.pathname.startsWith('/login')) {
		return NextResponse.next();
	}

	if(req.nextUrl.pathname.startsWith('/api')) {
		return await apiMiddleware(req);
	}

	if(req.nextUrl.pathname.match(/(.*).(svg|png|jpg|jpeg|ico)/g)) {
		return NextResponse.next();
	}

	return withAuth(req, event);
}

export const config = {
	matcher: [`/((?!_next/static|_next/image).*)`],
};
