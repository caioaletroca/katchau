import { SwipeableDrawer as MuiSwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import Puller from "./Puller";

export default function SwipeableDrawer({
	classes,
	...others
}: SwipeableDrawerProps) {
	return (
		<MuiSwipeableDrawer
			classes={{
				paper: 'rounded-t-xl',
				...classes
			}}
			{...others}>
			<div className="flex flex-col">
				<Puller />
			</div>
		</MuiSwipeableDrawer>
	);
}
