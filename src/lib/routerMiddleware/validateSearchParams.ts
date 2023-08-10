import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSearchParams } from '../intl/server';
import { NextHandler } from './types';

export function validateSearchParams(schema: z.ZodObject<any>) {
	return async (req: NextRequest, next: NextHandler) => {
		const search = getSearchParams(req);
		const response = schema.safeParse(search);

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
