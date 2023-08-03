import localizationMiddleware from '@/lib/intl/middleware';
import { getUnlocalizedPath } from '@/lib/intl/server';
import { checkWhitelist, NextHandler } from '@/lib/masterMiddleware';
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest } from 'next/server';

export type AuthMiddlewareConfig = {
	blacklist: string[];
};

export default function authMiddleware({ blacklist }: AuthMiddlewareConfig) {
	return async (req: NextRequest, event: NextFetchEvent, next: NextHandler) => {
		const pathname = getUnlocalizedPath(req);

		if (!checkWhitelist(pathname, blacklist)) {
			const middleware = withAuth(function onSuccess(req: NextRequestWithAuth) {
				return localizationMiddleware(req);
			});

			return (middleware as any)(req as NextRequestWithAuth, event);
		}

		return next();
	};
}
