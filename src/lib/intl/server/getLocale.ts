import { NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { getIntlConfig } from '../utils/getIntlConfig';

export function getLocale(req: NextRequest) {
	const config = getIntlConfig();
	const acceptLanguageHeader = req.headers.get('accept-language');

	if (!acceptLanguageHeader) {
		return config.defaultLocale;
	}

	const languages = new Negotiator({
		headers: {
			'accept-language': acceptLanguageHeader,
		},
	}).languages();

	return match(languages, config.locales, config.defaultLocale);
}
