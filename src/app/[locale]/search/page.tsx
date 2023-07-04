'use client';

import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
import React from 'react';
import { useIntl } from 'react-intl';
import Content from './Content';

export default function SearchPage() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'search.title',
					defaultMessage: 'Search',
				})}
				onBackClick={handleBack}
			/>
			<Content />
		</PageMobile>
	);
}
