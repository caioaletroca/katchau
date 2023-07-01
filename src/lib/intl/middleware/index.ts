import { NextRequest, NextResponse } from "next/server";
import { getLocale, getPathname } from "../server";
import { getIntlConfig } from "../utils/getIntlConfig";
import { hasPathnamePrefixed } from "../utils/hasPathnamePrefixed";
import localizePathname from "../utils/localizePathname";

export default function intlMiddleware(req: NextRequest) {
	const config = getIntlConfig();

	// Check if there is any supported locale in the pathname
  const pathname = getPathname(req);
	const pathnameIsMissingLocale = config.locales.every(locale => !hasPathnamePrefixed(locale, pathname));

	// Redirect user for the preferable locale by the system
	if(pathnameIsMissingLocale) {
		const locale = getLocale(req);

		return NextResponse.redirect(
			new URL(localizePathname(locale, pathname), req.url)
		);
	}

	return NextResponse.next();
}
