'use client';

import PageMobile from '@/components/Page/PageMobile';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNewPost } from '../NewPostContext';
import './styles.scss';

export default function NewPostLoadingPage() {
	const intl = useIntl();
	const { loading, handleSubmit } = useNewPost();

	React.useEffect(() => {
		if (loading) {
			return;
		}

		handleSubmit();
	}, [loading, handleSubmit]);

	return (
		<PageMobile>
			<div className="flex h-full flex-col items-center justify-center gap-12">
				<div className="animated-logo relative flex overflow-hidden rounded-full">
					<Image
						alt={intl.formatMessage({
							id: 'new.post.loading.logoAlt',
							defaultMessage: 'Katchau logo on loading animation',
						})}
						height={128}
						width={128}
						src="/block-inverted.svg"
					/>
				</div>
				<Typography className="text-neutral-400" variant="h5">
					{intl.formatMessage({
						id: 'new.post.loading.label',
						defaultMessage: 'Uploading your post',
					})}
				</Typography>
			</div>
		</PageMobile>
	);
}
