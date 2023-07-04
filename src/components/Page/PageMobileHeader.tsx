import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Icon from '../Icon';

type PageMobileHeaderProps = {
	onBackClick?: () => void;
	onForwardClick?: () => void;
	title?: string;
};

export default function PageMobileHeader({
	onBackClick,
	onForwardClick,
	title,
}: PageMobileHeaderProps) {
	return (
		<AppBar position="static">
			<Toolbar>
				{onBackClick && (
					<IconButton onClick={onBackClick}>
						<Icon name="arrow_back" />
					</IconButton>
				)}
				<Typography className="flex-1" variant="h6">
					{title}
				</Typography>
				{onForwardClick && (
					<IconButton onClick={onForwardClick}>
						<Icon name="arrow_forward" />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
