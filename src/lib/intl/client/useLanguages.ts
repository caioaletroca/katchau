import sortBy from 'lodash/sortBy';
import React from 'react';
import languages from '../languages';
import { getIntlConfig } from '../utils/getIntlConfig';

export function useLanguages() {
	const intlConfig = getIntlConfig();

	const langs = React.useMemo(
		() =>
			sortBy(
				intlConfig.locales.map((locale) =>
					languages.find((lang) => lang.locale === locale)
				),
				'name'
			),
		[intlConfig]
	);

	return langs;
}
