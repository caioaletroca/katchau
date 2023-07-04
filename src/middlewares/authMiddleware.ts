import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import localizationMiddleware from '@/lib/intl/middleware';

const authMiddleware = withAuth(function onSuccess(req: NextRequestWithAuth) {
	return localizationMiddleware(req);
});

export default authMiddleware;
