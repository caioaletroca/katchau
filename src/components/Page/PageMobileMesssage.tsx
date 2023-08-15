'use client';

import { Typography } from '@mui/material';
import Icon from '../Icon';

type PageMobileMessageProps = {
	icon?: string;
	message: string;
};

export default function PageMobileMessage({
	icon,
	message,
}: PageMobileMessageProps) {
	return (
		<div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
			{icon && <Icon className="text-8xl text-neutral-700" name={icon} />}
			<Typography color="grey" variant="body2">
				{message}
			</Typography>
		</div>
	);
}
