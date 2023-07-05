import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { NextHandler } from './types';

export function validateBody(schema: z.ZodObject<any>) {
	return async (req: NextRequest, next: NextHandler) => {
		const body = await req.json();
		const response = schema.safeParse(body);

		if (!response.success) {
			const { errors } = response.error;

			return new NextResponse(
				JSON.stringify({
					message: 'Invalid request',
					errors,
				}),
				{
					status: 400,
					headers: { 'content-type': 'application/json' },
				}
			);
		}

		return next();
	};
}
