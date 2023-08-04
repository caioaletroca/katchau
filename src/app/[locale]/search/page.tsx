'use client';

import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
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
			<BottomNavigation />
		</PageMobile>
	);
}
