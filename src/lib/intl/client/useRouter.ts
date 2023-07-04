import React from 'react';
import { useRouter as useNextRouter } from 'next/navigation';
import { useLocale } from './useLocale';

export function useRouter() {
	const router = useNextRouter();
	const locale = useLocale();

	return React.useMemo(() => {
		function localize(href: string) {
			return `/${locale}${href}`;
		}

		return {
			...router,
			push(href: string) {
				return router.push(localize(href));
			},
			replace(href: string) {
				return router.replace(localize(href));
			},
			prefetch(href: string) {
				return router.prefetch(localize(href));
			},
		};
	}, [locale, router]);
}
