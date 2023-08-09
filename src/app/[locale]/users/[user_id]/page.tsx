'use client';

import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import ProfileActions from '@/components/Profile/ProfileActions';
import ProfileContent from '@/components/Profile/ProfileContent';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileInfo from '@/components/Profile/ProfileInfo';
import { useRouter } from '@/lib/intl/client';
import { useParams } from 'next/navigation';

export default function UserPage() {
	const router = useRouter();
	const { user_id } = useParams();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<ProfileHeader user_id={user_id} onBack={handleBack} />
			<div className="flex h-full flex-col overflow-y-auto">
				<ProfileInfo user_id={user_id} />
				<ProfileActions user_id={user_id} />
				<ProfileContent user_id={user_id} />
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
