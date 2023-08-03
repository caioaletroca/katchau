export default function localizePathname(locale: string, pathname: string) {
	const loc = locale.replace('/', '');
	const path = pathname.replace('/', '');
	return `/${loc}/${path}`;
}
