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

export default api;
