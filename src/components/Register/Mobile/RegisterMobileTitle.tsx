import { Typography } from '@mui/material';

type TitleProps = {
	title: string;
	subtitle: string;
};

export default function RegisterMobileTitle({ title, subtitle }: TitleProps) {
	return (
		<div className="mb-4 flex flex-col gap-2">
			<Typography variant="h5">{title}</Typography>
			<Typography variant="caption">{subtitle}</Typography>
		</div>
	);
}
