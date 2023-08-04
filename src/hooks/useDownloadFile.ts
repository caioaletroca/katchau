import downloadImage from '@/utils/image/downloadImage';
import React from 'react';

export default function useDownloadFile(url?: string) {
	const [file, setFile] = React.useState<File>();

	React.useEffect(() => {
		(async () => {
			if (url && !file) {
				const file = await downloadImage(url);
				setFile(file);
			}
		})();
	}, [url, file]);

	return file;
}
