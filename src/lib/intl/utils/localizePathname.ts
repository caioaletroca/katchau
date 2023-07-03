import path from 'path';

export default function localizePathname(locale: string, pathname: string) {
	return path.join('/', locale, pathname);
}
