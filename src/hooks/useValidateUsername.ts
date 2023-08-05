import { useCheckUsername } from '@/api/users';
import { useDebounce } from './useDebounce';

export default function useValidateUsername(username: string) {
	const { data, isMutating, trigger } = useCheckUsername();

	useDebounce(
		() => {
			if (username === '') {
				return;
			}

			trigger({
				username,
			});
		},
		500,
		[username]
	);

	return {
		data,
		isMutating,
	};
}
