import { getIntlConfig } from '../utils/getIntlConfig';
import toPseudoLocale from '../utils/toPseudoLocale';
import { useLocale } from './useLocale';

export function usePseudoLocale() {
	const config = getIntlConfig();

	return toPseudoLocale(useLocale(), config.defaultLocale);
}
