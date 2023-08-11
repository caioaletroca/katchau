/**
 * Converts a object to a query string to compose a URL
 * @param obj
 * @returns
 */
export default function getQueryString(obj: any) {
	const searchParams = new URLSearchParams();

	if (!obj) {
		return '';
	}

	Object.keys(obj).forEach((key) => searchParams.append(key, obj[key]));

	const queryString = searchParams.toString();

	return queryString ? `?${queryString}` : '';
}
