import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareHandler, NextHandler, RouteHandler } from './types';

export function applyMiddleware(
	middlewares: MiddlewareHandler[],
	action: RouteHandler
) {
	return async (req: NextRequest, event: NextFetchEvent) => {
		let i = 0;

		const next: NextHandler = async (err) => {
			if (err != null) {
				return await action(req, event);
			}

			if (i >= middlewares.length) {
				return await action(req, event);
			}

			const layer = middlewares[i++];
			try {
				return await layer(req, event, next);
			} catch (error) {
				console.log(error);
				return await next(error);
			}
		};

		return await next();
	};
}
