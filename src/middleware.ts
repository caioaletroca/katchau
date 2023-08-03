import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { applyMiddleware } from './lib/masterMiddleware';
import apiMiddleware from './middlewares/apiMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import localizationMiddleware from './middlewares/localizationMiddleware';
import resourceMiddleware from './middlewares/resourceMiddleware';

export default async function middleware(
	req: NextRequest,
	event: NextFetchEvent
) {
	return applyMiddleware(
		[
			resourceMiddleware,
			localizationMiddleware({
				whitelist: ['/login', '/register', '/register/(.*)'],
			}),
			apiMiddleware({
				basePath: '/api',
				blacklist: ['/api/auth/(.*)', '/api/users/username', '/api/register'],
			}),
			authMiddleware({
				blacklist: [
					// Front End
					'/login',
					'/register/(.*)',

					// Back End
					'/api/users/username',
					'/api/register',
				],
			}),
		],
		(req: NextRequest, event: NextFetchEvent) => {
			return NextResponse.next();
		}
	)(req, event);
}

export const config = {
	matcher: [`/((?!_next/static|_next/image).*)`],
};
