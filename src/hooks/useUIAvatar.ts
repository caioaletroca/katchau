import React from 'react';

const UI_AVATAR_PATH = 'https://ui-avatars.com/api';

export const useUIAvatar = ({ name }: { name: string }) => {
	const [url, setUrl] = React.useState<string>('');

	React.useEffect(() => {
		if (!name && url) {
			return;
		}

		const urlParams = new URLSearchParams({
			name,
			rounded: 'true',
			size: '256',
			background: 'random',
		});

		const urlObject = new URL(`${UI_AVATAR_PATH}/?${urlParams.toString()}`);

		setUrl(urlObject.href);
	}, [name, url]);

	return url;
};
