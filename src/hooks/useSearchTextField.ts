'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { getKey } from '@/lib/fetcher';
import isEmpty from 'lodash/isEmpty';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type UseSearchProps = {
	name: string;
	basePath?: string;
	apiPath?: string;
	onStart?: (path: string, api: string) => void;
	onSubmit?: (path: string, api: string) => void;
};

export function useSearchTextField({
	name,
	basePath,
	apiPath = basePath,
	onStart,
	onSubmit,
}: UseSearchProps) {
	const searchParams = useSearchParams();
	const [search, setSearch] = React.useState('');

	React.useEffect(() => {
		// Get current query values
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		// Set local value
		const searchString = current.get(name);

		// Do nothing if empty
		if (isEmpty(searchString)) {
			return;
		}

		setSearch(searchString!);
		onStart?.(getKey(basePath!, searchString), getKey(apiPath!, searchString));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useDebounce(
		async () => {
			onSubmit?.(
				getKey(basePath!, search !== '' ? { name: search } : {}),
				getKey(apiPath!, search !== '' ? { name: search } : {})
			);
		},
		500,
		[search]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleClear = () => {
		setSearch('');
	};

	return {
		search,
		handleChange,
		handleClear,
	};
}
