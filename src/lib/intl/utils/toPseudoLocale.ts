export default function toPseudoLocale(
	locale: string,
	defaultLocale: string
): string {
	return locale ? locale.split('-')[0] : defaultLocale.split('-')[0];
}
