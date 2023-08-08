'use client';

import { useUserSearch } from '@/api/users';
import Icon from '@/components/Icon';
import UserListItem from '@/components/UserListItem';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import {
	CircularProgress,
	IconButton,
	InputAdornment,
	List,
	TextField,
	Typography,
} from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useIntl } from 'react-intl';

/**
 * TODO: Maybe put this file back into root?
 * @returns
 */

const EmptyScreen = () => {
	const intl = useIntl();

	return (
		<div className="flex h-full flex-col items-center justify-center gap-4">
			<Icon className="text-8xl text-neutral-700" name="search_off" />
			<Typography color="grey" variant="body2">
				{intl.formatMessage({
					id: 'search.noResultsFound',
					defaultMessage: 'No results found',
				})}
			</Typography>
		</div>
	);
};

const LoadingScreen = () => (
	<div className="flex h-full items-center justify-center">
		<CircularProgress />
	</div>
);

export default function Content() {
	const intl = useIntl();
	const router = useRouter();
	const pathname = useUnlocalizedPathname();
	const searchParams = useSearchParams();
	const [search, setSearch] = React.useState('');
	const { data: users, isLoading, trigger } = useUserSearch();

	React.useEffect(() => {
		// Get current query values
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		// Set local value
		const searchString = current.get('q');

		// Do nothing if empty
		if (isEmpty(searchString)) {
			return;
		}

		setSearch(searchString!);

		// Trigger request
		trigger(`/users?name=${search}`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useDebounce(
		async () => {
			// Get current query values
			const current = new URLSearchParams(Array.from(searchParams.entries()));

			// Avoid setting if empty
			if (isEmpty(search)) {
				current.delete('q');
			} else {
				current.set('q', search);
			}

			const queryString = current.toString();
			const query = queryString ? `?${queryString}` : '';

			// Re-route front-end
			router.push(`${pathname}${query}`);

			// Send search request
			trigger(`/users?name=${search}`);
		},
		300,
		[search]
	);

	return (
		<div className="flex h-full flex-col px-2">
			<TextField
				name="search"
				placeholder={intl.formatMessage({
					id: 'search.searchFieldPlaceholder',
					defaultMessage: 'Search for someone...',
				})}
				value={search}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Icon name="search" />
						</InputAdornment>
					),
					endAdornment: search !== '' && (
						<InputAdornment position="end">
							<IconButton onClick={() => setSearch('')}>
								<Icon name="close" />
							</IconButton>
						</InputAdornment>
					),
				}}
				onChange={(e) => setSearch(e.target.value)}
				size="small"
				fullWidth
			/>
			{isLoading && <LoadingScreen />}
			{!isLoading && users?.length === 0 && search !== '' && <EmptyScreen />}
			{!isLoading && users?.length !== 0 && search !== '' && (
				<List>
					{users?.map((user) => (
						<UserListItem key={user.id} user={user} />
					))}
				</List>
			)}
		</div>
	);
}
