import { getUnlocalizedPath } from '@/lib/intl/server';
import { NextHandler } from '@/lib/masterMiddleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function resourceMiddleware(
	req: NextRequest,
	event: NextFetchEvent,
	next: NextHandler
) {
	const pathname = getUnlocalizedPath(req);

	if (pathname.match(/(.*).(svg|png|jpg|jpeg|ico)/g)) {
		return NextResponse.next();
	}

	return next();
}
