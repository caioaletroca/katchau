import useSWRMutation from 'swr/mutation';
import { postFetcher } from '.';

export function useRegister() {
	return useSWRMutation('/register', postFetcher);
}
