'use client';

import { useUser } from '@/api/users';
import { Typography } from '@mui/material';
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

type InfoProps = {
	user_id: string;
};

export default function Info({ user_id }: InfoProps) {
	const intl = useIntl();
	const { data: user } = useUser({ user_id });

	return (
		<div className="flex flex-col p-4">
			<div className="flex flex-row justify-between">
				<div />
				<div className="flex flex-row gap-4">
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
			</div>
			<Typography>{user?.name}</Typography>
		</div>
	);
}
