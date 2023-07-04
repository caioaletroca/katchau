'use client';

import PageMobile from '@/components/Page/PageMobile';
import { Button } from '@mui/material';
import React from 'react';
import { useNewPost } from '../NewPostContext';

export default function NewPostLoadingPage() {
	const { handleSubmit } = useNewPost();

	React.useEffect(() => {
		handleSubmit();
	}, [handleSubmit]);

	return (
		<PageMobile>
			<p>Loading</p>
			<Button onClick={handleSubmit}>Send</Button>
		</PageMobile>
	);
}
