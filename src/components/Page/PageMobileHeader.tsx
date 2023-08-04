import { LoadingButton } from '@mui/lab';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import Icon from '../Icon';

type PageMobileHeaderProps = {
	loading?: boolean;
	disabled?: boolean;
	onCancel?: () => void;
	confirmLabel?: string;
	onConfirm?: () => void;
	onBackClick?: () => void;
	onForwardClick?: () => void;
	title?: string;
};

export default function PageMobileHeader({
	loading,
	disabled,
	onCancel,
	confirmLabel,
	onConfirm,
	onBackClick,
	onForwardClick,
	title,
}: PageMobileHeaderProps) {
	const intl = useIntl();

	return (
		<AppBar position="static">
			<Toolbar>
				{onBackClick && (
					<IconButton onClick={onBackClick}>
						<Icon name="arrow_back" />
					</IconButton>
				)}
				{onCancel && (
					<Button disabled={disabled} color="error" onClick={onCancel}>
						{intl.formatMessage({
							id: 'common.cancel',
							defaultMessage: 'Cancel',
						})}
					</Button>
				)}
				<Typography className="flex-1" variant="h6">
					{title}
				</Typography>
				{onForwardClick && (
					<IconButton onClick={onForwardClick}>
						<Icon name="arrow_forward" />
					</IconButton>
				)}
				{onConfirm && (
					<LoadingButton loading={loading} color="success" onClick={onConfirm}>
						{confirmLabel ??
							intl.formatMessage({
								id: 'common.confirm',
								defaultMessage: 'Confirm',
							})}
					</LoadingButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
