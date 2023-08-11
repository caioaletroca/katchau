'use client';

import useClipboard from '@/hooks/useClipboard';
import useShare from '@/hooks/useShare';
import useTimeout from '@/hooks/useTimeout';
import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import Icon from '../Icon';
import SwipeableDrawer, { SwipeableDrawerProps } from '../SwipeableDrawer';

type PostShareDrawerProps = SwipeableDrawerProps & {
	post_id: string;
};

export function PostShareDrawer({
	post_id,
	onClose,
	...others
}: PostShareDrawerProps) {
	const intl = useIntl();

	const { copy } = useClipboard();
	const { trigger: copyDelay, running: copyDelayLoading } = useTimeout(5000);
	const { share } = useShare();

	const handleShare = async (event: React.MouseEvent) => {
		await share({
			url: window.location.href,
		});

		onClose(event);
	};

	const handleCopyLink = () => {
		copy(window.location.href);
		copyDelay();
	};

	return (
		<SwipeableDrawer
			anchor="bottom"
			disableDiscovery
			disableSwipeToOpen
			onClose={onClose}
			{...others}>
			<div className="flex">
				<div className="flex flex-col justify-center p-4">
					<IconButton onClick={handleShare}>
						<Icon name="share" />
					</IconButton>
					<Typography variant="caption" align="center">
						{intl.formatMessage({
							id: 'common.share',
							defaultMessage: 'Share',
						})}
					</Typography>
				</div>
				<div className="flex flex-col justify-center p-4">
					<IconButton onClick={handleCopyLink}>
						<Icon name={copyDelayLoading ? 'done' : 'link'} />
					</IconButton>
					<Typography variant="caption" align="center">
						{copyDelayLoading
							? intl.formatMessage({
									id: 'common.copied',
									defaultMessage: 'Copied',
							  })
							: intl.formatMessage({
									id: 'common.copyLink',
									defaultMessage: 'Copy link',
							  })}
					</Typography>
				</div>
			</div>
		</SwipeableDrawer>
	);
}
