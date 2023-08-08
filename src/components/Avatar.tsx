"use client";

import { useUIAvatar } from '@/hooks/useUIAvatar';
import getStoragePath from '@/utils/storage/getStoragePath';
import {
	Avatar as MuiAvatar,
	AvatarProps as MuiAvatarProps,
} from '@mui/material';
import { useIntl } from 'react-intl';

type AvatarSize = 'small' | 'normal';

enum AvatarSizeValue {
	'small' = 24,
	'normal' = 56,
}

export type AvatarProps = MuiAvatarProps & {
	name: string;
	url?: string | null;
	size?: AvatarSize;
};

export default function Avatar({
	name,
	url,
	size = 'normal',
	...others
}: AvatarProps) {
	const intl = useIntl();

	const defaultUrl = useUIAvatar({ name });
	const src = url ? getStoragePath('profiles', url) : defaultUrl;

	return (
		<MuiAvatar
			alt={intl.formatMessage({
				id: 'profile.profileImage.alt',
				defaultMessage: 'Your profile picture',
			})}
			src={src}
			sx={{
				width: AvatarSizeValue[size],
				height: AvatarSizeValue[size],
			}}
			{...others}
		/>
	);
}
