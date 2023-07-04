import { Typography } from "@mui/material";

type TitleProps = {
	title: string;
	subtitle: string;
}

export default function Title({
	title,
	subtitle
}: TitleProps) {
	return (
		<div className='flex flex-col mb-4 gap-2'>
			<Typography variant='h5'>
				{title}
			</Typography>
			<Typography variant='caption'>
				{subtitle}
			</Typography>
		</div>
	);
}
