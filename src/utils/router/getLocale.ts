import { NextRequest } from "next/server";
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'

export default function getLocale(req: NextRequest, locales: string[], defaultLocale: string) {
	const acceptLanguageHeader = req.headers.get("accept-language");
	
	if(!acceptLanguageHeader) {
		return defaultLocale;
	}

	const languages = new Negotiator({
		headers: {
			'accept-language': acceptLanguageHeader
		}
	}).languages();

	return match(languages, locales, defaultLocale);
}
