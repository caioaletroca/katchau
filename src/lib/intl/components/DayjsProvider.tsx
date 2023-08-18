'use client';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React from 'react';
import { useLocale } from '../client';

import 'dayjs/locale/es-us';
import 'dayjs/locale/pt-br';

export default function DayjsProvider({ children }: React.PropsWithChildren) {
	const locale = useLocale();

	React.useEffect(() => {
		dayjs.extend(localizedFormat);
		dayjs.extend(relativeTime);
		dayjs.extend(updateLocale);
	}, []);

	React.useEffect(() => {
		dayjs.locale(locale.toLowerCase());
	}, [locale]);

	return <>{children}</>;
}
