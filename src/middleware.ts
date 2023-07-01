import type { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

import apiMiddleware from './middlewares/apiMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import localizationMiddleware from './lib/intl/middleware';
import { getUnlocalizedPath } from './lib/intl/server';

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
	const pathname = getUnlocalizedPath(req);

	if(pathname.startsWith('/login')) {
		return localizationMiddleware(req);
	}

	if(pathname.startsWith('/api')) {
		if(!pathname.startsWith('/api/auth')) {
			return await apiMiddleware(req);
		}
	}

	if(pathname.match(/(.*).(svg|png|jpg|jpeg|ico)/g)) {
		return NextResponse.next();
	}

	return (authMiddleware as any)(req, event);
}

export const config = {
	matcher: [`/((?!_next/static|_next/image).*)`],
};
