import { useLazySWR } from '@/hooks/useLazySWR';
import { getFetcher, Response } from '@/lib/fetcher';
import { Conversation } from '@/types/conversations';

export function useConversation() {
	return useLazySWR<Response<Conversation>>(getFetcher);
}
