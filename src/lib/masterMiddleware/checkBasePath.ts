import { pathToRegexp } from 'path-to-regexp';

export function checkBasePath(pathname: string, path: string) {
	const clearPath = path.replace('/', '');

	const paths = [`/${clearPath}`, `/${clearPath}/(.*)`];

	return paths.some((path) => pathToRegexp(path).test(pathname));
}
