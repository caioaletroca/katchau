import type { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

import apiMiddleware from './middlewares/apiMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import localizationMiddleware from './middlewares/localizationMiddleware';

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
	if(req.nextUrl.pathname.startsWith('/login')) {
		return localizationMiddleware(req);
	}

	if(req.nextUrl.pathname.startsWith('/api')) {
		if(!req.nextUrl.pathname.startsWith('/api/auth')) {
			return await apiMiddleware(req);
		}
	}

	if(req.nextUrl.pathname.match(/(.*).(svg|png|jpg|jpeg|ico)/g)) {
		return NextResponse.next();
	}

	return (authMiddleware as any)(req, event);
}

export const config = {
	matcher: [`/((?!_next/static|_next/image).*)`],
};
