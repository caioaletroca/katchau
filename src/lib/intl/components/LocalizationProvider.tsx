"use client";

import { IntlProvider } from 'react-intl';
import { notFound, useParams } from 'next/navigation';
import { getIntlConfig } from '../utils/getIntlConfig';
import { useLocale } from '../client';
import toPseudoLocale from '../utils/toPseudoLocale';

type LocalizationProviderProps = React.PropsWithChildren;

export default async function LocalizationProvider({
	children
}: LocalizationProviderProps) {
	const locale = useLocale();
	const config = getIntlConfig();
	const pseudoLocale = toPseudoLocale(locale, config.defaultLocale);
	
	let messages;
  try {
    messages = (await import(`@/../locales/compiled/${pseudoLocale}.json`)).default;
  } catch (error) {
    notFound();
  }

	return (
		<IntlProvider locale={locale} messages={messages}>
			{children}
		</IntlProvider>
	);
}
