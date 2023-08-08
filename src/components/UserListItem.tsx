import { useRouter } from '@/lib/intl/client';
import { UserWithProfilePicture } from '@/types/users';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { User } from '@prisma/client';
import { useIntl } from 'react-intl';
import Avatar from './Avatar';

type UserListItemProps = {
	user: UserWithProfilePicture;
};

export default function UserListItem({ user }: UserListItemProps) {
	const intl = useIntl();
	const router = useRouter();

	const handleClick = (user: User) => {
		router.push(`/users/${user.id}`);
	};

	return (
		<ListItemButton key={user.id} onClick={() => handleClick(user)}>
			<ListItemAvatar>
				<Avatar
					size="small"
					name={user.name!}
					alt={intl.formatMessage(
						{
							id: 'search.profileImage.alt',
							defaultMessage: '{name} profile picture',
						},
						{
							name: user.name,
						}
					)}
					url={user.profile_picture[0]?.url}
				/>
			</ListItemAvatar>
			<ListItemText primary={user.username} secondary={user.name} />
		</ListItemButton>
	);
}
