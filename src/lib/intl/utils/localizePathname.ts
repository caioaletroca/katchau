export default function localizePathname(locale: string, pathname: string) {
	return `/${locale}/${pathname}`;
}
