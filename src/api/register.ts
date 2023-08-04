import useSWRMutation from 'swr/mutation';
import { postFetcher } from '.';

export function useRegister(options?: any) {
	return useSWRMutation('/register', postFetcher, options);
}
