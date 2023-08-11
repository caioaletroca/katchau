import getQueryString from '@/utils/searchParams/getQueryString';
import { PaginationResponse } from './types';

export function getKeyCursorPagination(basePath: string, queryParams?: any) {
	return (index: number, previousPageData: PaginationResponse) => {
		if (previousPageData && !previousPageData.data) {
			return null;
		}
		if (index === 0) {
			return `${basePath}${getQueryString(queryParams)}`;
		}

		return `${basePath}${getQueryString({
			...queryParams,
			cursor: previousPageData.nextCursor,
		})}`;
	};
}
