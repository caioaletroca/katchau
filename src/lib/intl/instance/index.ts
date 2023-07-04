import { createIntl, createIntlCache, IntlConfig, IntlShape } from 'react-intl';
import { getIntlConfig } from '../utils/getIntlConfig';
import English from '@/../../locales/compiled/en.json';

export type SubscriptionFunction = (intl: IntlShape) => void;

const cache = createIntlCache();

const intlConfig = getIntlConfig();

export let intl = createIntl(
	{
		locale: intlConfig.defaultLocale,
		messages: English,
	},
	cache
);

let subscriptions: Record<string, SubscriptionFunction> = {};

export function subscribeIntl(key: string, handler: SubscriptionFunction) {
	subscriptions[key] = handler;
}

export function unsubscribeIntl(key: string) {
	delete subscriptions[key];
}

export function fireIntl() {
	Object.values(subscriptions).every((handler) => handler(intl));
}

export function updateIntl(config: IntlConfig) {
	intl = createIntl(config, cache);
	fireIntl();
}
