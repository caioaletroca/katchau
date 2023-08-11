import { patchFetcher, RequestSWROptions } from '@/lib/fetcher';
import { User } from '@prisma/client';
import useSWRMutation from 'swr/mutation';

export function useUpdateProfile(options?: RequestSWROptions<User>) {
	return useSWRMutation('/auth/profile', patchFetcher, options);
}
