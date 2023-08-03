import intlMiddleware from '@/lib/intl/middleware';
import { getUnlocalizedPath } from '@/lib/intl/server';
import { checkWhitelist, NextHandler } from '@/lib/masterMiddleware';
import { NextFetchEvent, NextRequest } from 'next/server';

export type LocalizationMiddlewareConfig = {
	whitelist: string[];
};

export default function localizationMiddleware({
	whitelist,
}: LocalizationMiddlewareConfig) {
	return async (req: NextRequest, event: NextFetchEvent, next: NextHandler) => {
		const pathname = getUnlocalizedPath(req);

		if (checkWhitelist(pathname, whitelist)) {
			return intlMiddleware(req);
		}

		return next();
	};
}
