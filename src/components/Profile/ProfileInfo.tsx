'use client';

import { useFollows } from '@/api/follows';
import { usePosts } from '@/api/posts';
import { useUserProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import Avatar from '@/components/Avatar';
import { Skeleton, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

type ProfileInfoBlockProps = {
	label: string;
	value?: number;
};

const ProfileInfoBlock = ({ label, value = 0 }: ProfileInfoBlockProps) => (
	<div className="flex flex-col items-center justify-center">
		<Typography>{value}</Typography>
		<Typography variant="body2">{label}</Typography>
	</div>
);

export const ProfileInfoLoading = () => (
	<div className="flex flex-col p-4">
		<div className="mb-2 flex flex-row justify-between">
			<Skeleton variant="circular" width={56} height={56} />
			<Skeleton variant="rounded" width="25%" height={56} />
			<Skeleton variant="rounded" width="25%" height={56} />
			<Skeleton variant="rounded" width="25%" height={56} />
		</div>
	</div>
);

type ProfileInfoProps = {
	user_id: string;
};

export default function ProfileInfo({ user_id }: ProfileInfoProps) {
	const intl = useIntl();
	const { data: user, isLoading: userLoading } = useUser({ user_id });
	const { data: profileImage, isLoading: profileImageLoading } =
		useUserProfileImage({ user_id });
	const { data: posts, isLoading: postLoading } = usePosts({ user_id });
	const { data: follows, isLoading: followsLoading } = useFollows({ user_id });

	if (userLoading || postLoading || profileImageLoading || followsLoading) {
		return <ProfileInfoLoading />;
	}

	return (
		<div className="flex flex-col p-4">
			<div className="mb-2 flex flex-row justify-between">
				<Avatar
					alt={intl.formatMessage({
						id: 'profile.profilePictureAlt',
						defaultMessage: 'Your profile picture',
					})}
					name={user?.name!}
					url={profileImage?.url!}
				/>
				<ProfileInfoBlock
					label={intl.formatMessage({
						id: 'profile.postsLabel',
						defaultMessage: 'Posts',
					})}
					value={posts?.length}
				/>
				<ProfileInfoBlock
					label={intl.formatMessage({
						id: 'profile.followersLabel',
						defaultMessage: 'Followers',
					})}
					value={follows?.followeds?.length}
				/>
				<ProfileInfoBlock
					label={intl.formatMessage({
						id: 'profile.followingLabel',
						defaultMessage: 'Following',
					})}
					value={follows?.followings?.length}
				/>
			</div>
			<div className="mb-2 flex flex-col">
				<Typography className="font-bold" variant="subtitle2">
					{user?.name}
				</Typography>
				<Typography variant="body2">{user?.bio}</Typography>
			</div>
		</div>
	);
}
