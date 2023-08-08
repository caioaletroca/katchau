'use client';

import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import ProfileActions from '@/components/Profile/ProfileActions';
import ProfileContent from '@/components/Profile/ProfileContent';
import ProfileInfo from '@/components/Profile/ProfileInfo';
import { useRouter } from '@/lib/intl/client';
import { useParams } from 'next/navigation';

export default function UserPage() {
	const router = useRouter();
	const { user_id } = useParams();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader onBackClick={handleBack} />
			<ProfileInfo user_id={user_id} />
			<ProfileActions user_id={user_id} />
			<ProfileContent user_id={user_id} />
		</PageMobile>
	);
}
