import { useRouter as useNextRouter } from 'next/navigation';
import React from 'react';
import localizePathname from '../utils/localizePathname';
import { useLocale } from './useLocale';

export function useRouter() {
	const router = useNextRouter();
	const locale = useLocale();

	return React.useMemo(() => {
		return {
			...router,
			push(href: string) {
				return router.push(localizePathname(locale, href));
			},
			replace(href: string) {
				return router.replace(localizePathname(locale, href));
			},
			prefetch(href: string) {
				return router.prefetch(localizePathname(locale, href));
			},
		};
	}, [locale, router]);
}
