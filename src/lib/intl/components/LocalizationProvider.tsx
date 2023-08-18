'use client';

import { notFound } from 'next/navigation';
import { IntlProvider } from 'react-intl';
import { useLocale } from '../client';
import { getIntlConfig } from '../utils/getIntlConfig';
import toPseudoLocale from '../utils/toPseudoLocale';
import DayjsProvider from './DayjsProvider';

type LocalizationProviderProps = React.PropsWithChildren;

export default async function LocalizationProvider({
	children,
}: LocalizationProviderProps) {
	const locale = useLocale();
	const config = getIntlConfig();
	const pseudoLocale = toPseudoLocale(locale, config.defaultLocale);

	let messages;
	try {
		messages = (await import(`@/../locales/compiled/${pseudoLocale}.json`))
			.default;
	} catch (error) {
		notFound();
	}

	return (
		<IntlProvider locale={locale} messages={messages} onError={() => null}>
			<DayjsProvider>{children}</DayjsProvider>
		</IntlProvider>
	);
}
