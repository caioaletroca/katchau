import { getUnlocalizedPath } from '@/lib/intl/server';
import { checkWhitelist, NextHandler } from '@/lib/masterMiddleware';
import isEmpty from 'lodash/isEmpty';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

async function execute(req: NextRequest) {
	const token = await getToken({ req });

	if (isEmpty(token?.username)) {
		return NextResponse.redirect(new URL('/register-complete', req.url));
	}
}

type RegisterMiddlewareConfig = {
	blacklist?: string[];
};

export default function registerMiddleware({
	blacklist = [],
}: RegisterMiddlewareConfig) {
	return async (req: NextRequest, event: NextFetchEvent, next: NextHandler) => {
		const pathname = getUnlocalizedPath(req);

		if (!checkWhitelist(pathname, blacklist)) {
			return await execute(req);
		}

		return next();
	};
}
