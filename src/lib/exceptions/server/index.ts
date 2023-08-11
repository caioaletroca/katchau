import { NextResponse } from 'next/server';

export function BadRequestException(
	message: string = 'Request is invalid',
	meta?: any
) {
	return NextResponse.json(
		{
			message,
			meta,
		},
		{
			status: 400,
		}
	);
}

export function UnauthorizedException(
	message: string = 'User is not authorized',
	meta?: any
) {
	return NextResponse.json(
		{
			message,
			meta,
		},
		{
			status: 401,
		}
	);
}

export function ForbiddenException(
	message: string = 'Operation is forbidden for the user',
	meta?: any
) {
	return NextResponse.json(
		{
			message,
			meta,
		},
		{
			status: 403,
		}
	);
}

export function NotFoundException(
	message: string = 'Resource not found',
	meta?: any
) {
	return NextResponse.json(
		{
			message,
			meta,
		},
		{
			status: 403,
		}
	);
}
