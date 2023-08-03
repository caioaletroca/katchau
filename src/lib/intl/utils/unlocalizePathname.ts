export function unlocalizePathname(locale: string, pathname: string) {
	return pathname.replace(`/${locale}`, '') || '/';
}
