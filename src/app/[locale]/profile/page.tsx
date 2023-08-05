'use client';

import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import ProfileContent, {
	ProfileContentLoading,
} from '@/components/Profile/ProfileContent';
import ProfileInfo, {
	ProfileInfoLoading,
} from '@/components/Profile/ProfileInfo';
import { useSession } from 'next-auth/react';
import Header from './Header';

const ProfilePageLoading = () => (
	<PageMobile>
		<Header />
		<div className="flex-1">
			<ProfileInfoLoading />
			<ProfileContentLoading />
		</div>
		<BottomNavigation />
	</PageMobile>
);

export default async function ProfilePage() {
	const { data } = useSession();

	if (!data) {
		return <ProfilePageLoading />;
	}

	return (
		<PageMobile>
			<Header />
			<div className="flex flex-1 flex-col">
				<ProfileInfo user_id={data?.user.id} />
				<ProfileContent user_id={data?.user.id} />
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
