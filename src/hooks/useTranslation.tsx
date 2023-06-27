import { Translate } from 'next-translate';
import { default as useNextTranslation } from 'next-translate/useTranslation';

type I18nKey = Parameters<Translate>[0];
type Query = Parameters<Translate>[1];
type Options = Parameters<Translate>[2];

export default function useTranslation(defaultNS?: string) {
    const { t: nextT, ...others } = useNextTranslation(defaultNS);

    const t = (keys: I18nKey, defaultValue?: string, query?: Query, options?: Options) => {
        return nextT(keys, query, {
            default: defaultValue,
            ...options
        }) as string;
    };

    return {
        t, ...others
    }
}