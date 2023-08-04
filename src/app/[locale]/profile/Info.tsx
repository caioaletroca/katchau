'use client';

import { useUserProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import Avatar from '@/components/Avatar';
import { Skeleton, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

type InfoBlockProps = {
	label: string;
	value?: number;
};

const InfoBlock = ({ label, value = 0 }: InfoBlockProps) => (
	<div className="flex flex-col items-center justify-center">
		<Typography>{value}</Typography>
		<Typography variant="body2">{label}</Typography>
	</div>
);

const LoadingInfo = () => (
	<div className="flex flex-col p-4">
		<div className="mb-2 flex flex-row justify-between">
			<Skeleton variant="circular" width={56} height={56} />
			<Skeleton variant="rounded" width="25%" height={56} />
			<Skeleton variant="rounded" width="25%" height={56} />
			<Skeleton variant="rounded" width="25%" height={56} />
		</div>
	</div>
);

type InfoProps = {
	user_id: string;
};

export default function Info({ user_id }: InfoProps) {
	const intl = useIntl();
	const { data: user, isLoading: userLoading } = useUser({ user_id });
	const { data: profileImage, isLoading: profileImageLoading } =
		useUserProfileImage({ user_id });

	if (userLoading || profileImageLoading) {
		return <LoadingInfo />;
	}

	return (
		<div className="flex flex-col p-4">
			<div className="mb-2 flex flex-row justify-between">
				<Avatar name={user?.name!} url={profileImage?.url!} />
				<InfoBlock
					label={intl.formatMessage({
						id: 'profile.postsLabel',
						defaultMessage: 'Posts',
					})}
				/>
				<InfoBlock
					label={intl.formatMessage({
						id: 'profile.followersLabel',
						defaultMessage: 'Followers',
					})}
				/>
				<InfoBlock
					label={intl.formatMessage({
						id: 'profile.followingLabel',
						defaultMessage: 'Following',
					})}
				/>
			</div>
			<Typography variant="body2">{user?.name}</Typography>
		</div>
	);
}
