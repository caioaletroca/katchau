'use client';

import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
import { useIntl } from 'react-intl';
import Content from './Content';

export default function PostPage() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
				title={intl.formatMessage({
					id: 'post.title',
					defaultMessage: 'Posts',
				})}
			/>
			<div className="flex flex-1 flex-col">
				<Content />
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
