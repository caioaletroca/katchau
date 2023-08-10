import { User } from '@prisma/client';
import useSWRMutation from 'swr/mutation';
import { patchFetcher, RequestSWROptions } from '.';

export function useUpdateProfile(options?: RequestSWROptions<User>) {
	return useSWRMutation('/auth/profile', patchFetcher, options);
}
