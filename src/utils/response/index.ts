import { NextResponse } from 'next/server';

type Data = any;

type DataWithIdentifier = {
	id: string;
};

export const ApiResponse = {
	...NextResponse,

	empty() {
		return new NextResponse('', { status: 200 });
	},

	send(data: Data, meta: any) {
		return NextResponse.json({
			data,
			meta,
		});
	},

	sendCursorPagination(data: DataWithIdentifier[]) {
		return NextResponse.json({
			data,
			nextCursor: data.length ? data[data.length - 1].id : null,
		});
	},
};
