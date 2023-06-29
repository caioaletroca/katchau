"use client";

import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import useTranslation from 'next-translate/useTranslation';

export default function ConfigurationLanguagePage() {
	const { t } = useTranslation('language');

	return (
		<PageMobile>
			<PageMobileHeader backButton title={t('title', { default: 'App Language' })} />
		</PageMobile>
	);
}
