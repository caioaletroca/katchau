import { getUnlocalizedPath } from '@/lib/intl/server';
import {
	checkBasePath,
	checkWhitelist,
	NextHandler,
} from '@/lib/masterMiddleware';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type ApiMiddlewareConfig = {
	basePath: string;
	blacklist: string[];
};

export default function apiMiddleware({
	basePath,
	blacklist,
}: ApiMiddlewareConfig) {
	return async (req: NextRequest, event: NextFetchEvent, next: NextHandler) => {
		const pathname = getUnlocalizedPath(req);

		if (checkBasePath(pathname, basePath)) {
			if (!checkWhitelist(pathname, blacklist)) {
				const token = await getToken({ req });

				if (!token) {
					return new NextResponse(
						JSON.stringify({
							message: 'Unauthorized',
						}),
						{
							status: 401,
							headers: { 'content-type': 'application/json' },
						}
					);
				}

				return NextResponse.next();
			}
		}

		return next();
	};
}
