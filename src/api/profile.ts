import useSWRMutation from 'swr/mutation';
import { patchFetcher, RequestSWROptions } from '.';

export function useUpdateProfile(options?: RequestSWROptions) {
	return useSWRMutation('/auth/profile', patchFetcher, options);
}
