import useSWRMutation from 'swr/mutation';
import { postFetcher, RequestSWROptions } from '.';

export function useRegister(options?: RequestSWROptions) {
	return useSWRMutation('/register', postFetcher, options);
}
