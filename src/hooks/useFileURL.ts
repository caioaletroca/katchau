import React from 'react';

export default function useFileURL(file?: File) {
	return React.useMemo(() => {
		if (!file) {
			return '';
		}

		return URL.createObjectURL(file);
	}, [file]);
}
