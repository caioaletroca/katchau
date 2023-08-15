import { CursorPaginationSearchParams } from './types';

export default function getParseSearchParams({
	cursor,
	limit,
}: CursorPaginationSearchParams) {
	return {
		...(cursor
			? {
					cursor: {
						id: cursor,
					},
			  }
			: undefined),
		take: limit ? Number(limit) : 10,
		skip: cursor ? 1 : 0,
	};
}
