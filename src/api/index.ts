import axios from 'axios';

const api = axios.create({
	baseURL: '/api',
});

export const getFetcher = async (url: string) => {
	const { data } = await api.get(url);
	return data;
};

export const postFetcher = async (url: string, { arg }: { arg: any }) => {
	const { data } = await api.post(url, arg);
	return data;
};

export const postFormDataFetcher = async (
	url: string,
	{ arg }: { arg: object }
) => {
	const body = new FormData();

	for (let [key, entry] of Object.entries(arg)) {
		body.append(key, entry);
	}

	const { data } = await api.post(url, body);
	return data;
};

export const deleteFetcher = async (url: string, { arg }: { arg: any }) => {
	const { data } = await api.delete(url, arg);
	return data;
};

export default api;
