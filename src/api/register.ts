import { postFetcher, RequestSWROptions } from '@/lib/fetcher';
import useSWRMutation from 'swr/mutation';

export function useRegister(options?: RequestSWROptions) {
	return useSWRMutation('/register', postFetcher, options);
}
