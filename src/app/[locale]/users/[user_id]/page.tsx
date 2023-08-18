'use client';

import { useUser } from '@/api/users';
import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import PageMobileMessage from '@/components/Page/PageMobileMesssage';
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
import { useRouter } from '@/lib/intl/client';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';

function UserPageLoading() {
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<ProfileHeaderLoading onBack={handleBack} />
			<div className="flex h-full flex-col overflow-y-auto">
				<ProfileInfoLoading />
				<ProfileActionsLoading />
				<ProfileContentLoading />
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}

function UserPageError() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.push('/');

	return (
		<PageMobile>
			<PageMobileHeader onBackClick={handleBack} />
			<PageMobileMessage
				icon="draft"
				message={intl.formatMessage({
					id: 'post.error.userNotFound',
					defaultMessage: 'User not found',
				})}
			/>
			<BottomNavigation />
		</PageMobile>
	);
}

export default function UserPage() {
	const router = useRouter();
	const { user_id } = useParams();
	const { isLoading, error } = useUser({ user_id });

	const handleBack = () => router.back();

	if (isLoading) {
		return <UserPageLoading />;
	}

	if (error) {
		return <UserPageError />;
	}

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
