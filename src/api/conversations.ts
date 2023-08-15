import { getFetcher, Response } from '@/lib/fetcher';
import { Conversation } from '@/types/conversations';
import useSWR from 'swr';

export function useConversation() {
	return useSWR<Response<Conversation>>('/chat', getFetcher);
}
