export function unlocalizePathname(locale: string, pathname: string) {
  return pathname.replace(new RegExp(`^/${locale}`), '') || '/';
}
