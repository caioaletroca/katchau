'use client';

import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
import { useIntl } from 'react-intl';

export default function ConfigurationLanguagePage() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
				title={intl.formatMessage({
					id: 'language.title',
					defaultMessage: 'App Language',
				})}
			/>
		</PageMobile>
	);
}
