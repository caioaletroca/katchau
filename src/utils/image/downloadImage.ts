'use client';

import api from '@/api';

export default async function downloadImage(url: string) {
	const { data } = await api.get(url, { responseType: 'blob' });

	// Convert blob to File
	const file = new File([data], 'name');

	return file;
}
