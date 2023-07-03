import { PostLike } from "@prisma/client";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation'
import api from ".";

export function usePostLike({ post_id }: { post_id: string }) {
	return useSWR<PostLike>(`/posts/${post_id}/likes`, async (url) => (await api.get(url)).data);
}

export function usePostLikeUpdate({ post_id }: { post_id: string }) {
	return useSWRMutation<PostLike>(`/posts/${post_id}/likes`, async (url: string) => (await api.post(url)).data);
}
