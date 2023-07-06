import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { NextHandler } from './types';

export function validateBody(schema: z.ZodObject<any>) {
	return async (req: NextRequest, next: NextHandler) => {
		const body = await req.json();
		const response = schema.safeParse(body);

		if (!response.success) {
			const { errors } = response.error;

			return NextResponse.json(
				{
					message: 'Invalid request',
					errors,
				},
				{ status: 400 }
			);
		}

		return next();
	};
}
