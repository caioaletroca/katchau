'use client';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { notFound } from 'next/navigation';
import { IntlProvider } from 'react-intl';
import { useLocale } from '../client';
import { getIntlConfig } from '../utils/getIntlConfig';
import toPseudoLocale from '../utils/toPseudoLocale';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// TODO: Use updateLocale to actually update relative time keys

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
			{children}
		</IntlProvider>
	);
}
