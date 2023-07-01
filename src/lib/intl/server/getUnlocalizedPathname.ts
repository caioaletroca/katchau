import { unlocalizePathname } from "../utils/unlocalizePathname";
import { getIntlConfig } from "../utils/getIntlConfig";
import { NextRequest } from "next/server";
import { getPathname } from "./getPathname";

export function getUnlocalizedPath(req: NextRequest) {
	const config = getIntlConfig();

	let path = getPathname(req);
	config.locales.every(locale => unlocalizePathname(locale, path));
	return path;
}
