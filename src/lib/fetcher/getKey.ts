import getQueryString from '@/utils/searchParams/getQueryString';

export function getKey(basePath: string, queryParams?: any) {
	return `${basePath}${getQueryString(queryParams)}`;
}
