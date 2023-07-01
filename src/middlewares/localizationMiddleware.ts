import { NextRequest, NextResponse } from "next/server";
import { hasPathnamePrefixed } from "@/utils/router/hasPathnamePrefixed";
import localizePathname from "@/utils/router/localizePathname";
import getLocale from "@/utils/router/getLocale";

export const locales = ['en-US', 'pt-BR'];

export const defaultLocale = 'en-US';

export default function localizationMiddleware(req: NextRequest) {
	// Check if there is any supported locale in the pathname
  const pathname = req.nextUrl.pathname;
	const pathnameIsMissingLocale = locales.every(locale => !hasPathnamePrefixed(locale, pathname));

	// Redirect user for the preferable locale by the system
	if(pathnameIsMissingLocale) {
		const locale = getLocale(req, locales, defaultLocale);

		return NextResponse.redirect(
			new URL(localizePathname(locale, pathname), req.url)
		);
	}

	return NextResponse.next();
}
