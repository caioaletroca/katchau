import React from "react";
import useSWR, { BareFetcher } from "swr";

export function useLazySWR<T>(fetcher: BareFetcher<T>) {
	const [_key, _setKey] = React.useState<string>();
	const swr = useSWR<T>(_key, fetcher);

	const trigger = (key: string) => {
		_setKey(key);
	}

	return {
		...swr,
		trigger
	}
}
