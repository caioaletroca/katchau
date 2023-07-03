import useSWR from "swr";
import useSWRMutation from 'swr/mutation'
import api from ".";

export function useLike({ post_id }: { post_id: string }) {
	return useSWR(`/posts/${post_id}/likes`, async (url) => (await api.get(url)).data);
}

export function useLikeUpdate({ post_id }: { post_id: string }) {
	return useSWRMutation(`/posts/${post_id}/likes`, async url => (await api.post(url)).data);
}
