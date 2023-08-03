import { NextRequest } from 'next/server';
import { getIntlConfig } from '../utils/getIntlConfig';
import { unlocalizePathname } from '../utils/unlocalizePathname';
import { getPathname } from './getPathname';

export function getUnlocalizedPath(req: NextRequest) {
	const config = getIntlConfig();

	let path = getPathname(req);
	config.locales.forEach((locale) => {
		path = unlocalizePathname(locale, path);
	});
	return path;
}
