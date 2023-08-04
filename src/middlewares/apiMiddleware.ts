import { getUnlocalizedPath } from '@/lib/intl/server';
import {
	checkBasePath,
	checkWhitelist,
	NextHandler,
} from '@/lib/masterMiddleware';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

async function execute(req: NextRequest) {
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

export type ApiMiddlewareConfig = {
	basePath: string;
	whitelist?: string[];
	blacklist?: string[];
};

export default function apiMiddleware({
	basePath,
	whitelist = [],
	blacklist = [],
}: ApiMiddlewareConfig) {
	return async (req: NextRequest, event: NextFetchEvent, next: NextHandler) => {
		const pathname = getUnlocalizedPath(req);

		if (checkBasePath(pathname, basePath)) {
			if (checkWhitelist(pathname, whitelist)) {
				return await execute(req);
			}

			if (!checkWhitelist(pathname, blacklist)) {
				return await execute(req);
			}
		}

		return next();
	};
}
