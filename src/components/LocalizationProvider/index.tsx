"use client";

import { IntlProvider } from 'react-intl';
import { notFound, useParams } from 'next/navigation';
import toPseudoLocale from '@/utils/router/toPseudoLocale';
import { defaultLocale } from '@/middlewares/localizationMiddleware';

type LocalizationProviderProps = React.PropsWithChildren;

export default async function LocalizationProvider({
	children
}: LocalizationProviderProps) {
	const { locale } = useParams();
	const pseudoLocale = toPseudoLocale(locale, defaultLocale);
	
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
