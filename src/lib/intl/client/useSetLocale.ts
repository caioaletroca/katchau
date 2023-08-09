import { useRouter as useNextRouter } from 'next/navigation';
import localizePathname from '../utils/localizePathname';

export function useSetLocale() {
	const router = useNextRouter();

	return (locale: string, pathname: string) => {
		router.push(localizePathname(locale, pathname));
	};
}
