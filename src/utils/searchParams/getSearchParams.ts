import { NextRequest } from 'next/server';

/**
 * Get search params as an object from NextRequest
 * @param req
 * @returns
 */
export default function getSearchParams<T = any>(req: NextRequest) {
	const url = new URL(req.url);
	const search = new URLSearchParams(url.searchParams);

	let obj: any = {};
	for (const [key, value] of search.entries()) {
		obj[key] = value;
	}

	return obj as T;
}
