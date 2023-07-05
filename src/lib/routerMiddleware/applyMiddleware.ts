import { NextRequest } from 'next/server';
import { MiddlewareHandler, NextHandler, RouteHandler } from './types';

export function applyMiddleware(
	middlewares: MiddlewareHandler[],
	action: RouteHandler
) {
	return async (req: NextRequest) => {
		let i = 0;

		const next: NextHandler = async (err) => {
			if (err != null) {
				return await action(req);
			}

			if (i >= middlewares.length) {
				return await action(req);
			}

			const layer = middlewares[i++];
			try {
				const localReq = req.clone() as NextRequest;
				return await layer(localReq, next);
			} catch (error) {
				console.log(error);
				return await next(error);
			}
		};

		return await next();
	};
}
