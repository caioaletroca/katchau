import {
	Divider,
	SwipeableDrawer as MuiSwipeableDrawer,
	SwipeableDrawerProps as MuiSwipeableDrawerProps,
	Typography,
} from '@mui/material';
import Puller from './Puller';

export type SwipeableDrawerProps = MuiSwipeableDrawerProps & {
	title?: string;
};

export default function SwipeableDrawer({
	title,
	classes,
	children,
	...others
}: SwipeableDrawerProps) {
	return (
		<MuiSwipeableDrawer
			classes={{
				paper: 'rounded-t-xl',
				...classes,
			}}
			{...others}>
			{/* <div className="flex flex-col"> */}
			<Puller />
			{title && (
				<>
					<Typography className="mb-2 font-bold" align="center">
						{title}
					</Typography>
					<Divider />
				</>
			)}
			{children}
			{/* </div> */}
		</MuiSwipeableDrawer>
	);
}
