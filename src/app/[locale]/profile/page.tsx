'use client';

import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import ProfileActions, {
	ProfileActionsLoading,
} from '@/components/Profile/ProfileActions';
import ProfileContent, {
	ProfileContentLoading,
} from '@/components/Profile/ProfileContent';
import ProfileHeader, {
	ProfileHeaderLoading,
} from '@/components/Profile/ProfileHeader';
import ProfileInfo, {
	ProfileInfoLoading,
} from '@/components/Profile/ProfileInfo';
import { useSession } from 'next-auth/react';

const ProfilePageLoading = () => (
	<PageMobile>
		<ProfileHeaderLoading />
		<div className="flex-1">
			<ProfileInfoLoading />
			<ProfileActionsLoading />
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
			<ProfileHeader user_id={data?.user.id} />
			<div className="flex flex-1 flex-col">
				<ProfileInfo user_id={data?.user.id} />
				<ProfileActions user_id={data?.user.id} />
				<ProfileContent user_id={data?.user.id} />
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
