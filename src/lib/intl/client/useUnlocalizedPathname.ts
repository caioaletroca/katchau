import { usePathname } from 'next/navigation';
import { getIntlConfig } from '../utils/getIntlConfig';
import { unlocalizePathname } from '../utils/unlocalizePathname';

export function useUnlocalizedPathname() {
	const config = getIntlConfig();

	let path = usePathname();
	config.locales.forEach((locale) => {
		path = unlocalizePathname(locale, path);
	});
	return path;
}
