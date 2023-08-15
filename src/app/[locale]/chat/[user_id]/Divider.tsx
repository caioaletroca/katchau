'use client';

import { Typography } from '@mui/material';
import dayjs from 'dayjs';

type DividerProps = {
	date: Date;
};

export default function Divider({ date }: DividerProps) {
	return (
		<div className="my-2 flex w-full flex-col justify-center">
			<Typography className="text-neutral-700" variant="caption" align="center">
				{dayjs(date).format('LL')}
			</Typography>
		</div>
	);
}
