'use client';

import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import { useRouter } from '@/lib/intl/client';
import { useParams } from 'next/navigation';
import Content from '../../profile/Content';
import Info from '../../profile/Info';

export default function UserPage() {
	const router = useRouter();
	const { user_id } = useParams();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader onBackClick={handleBack} />
			<Info user_id={user_id} />
			<Content user_id={user_id} />
		</PageMobile>
	);
}
