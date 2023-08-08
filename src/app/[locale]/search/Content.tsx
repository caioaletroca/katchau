'use client';

import { useUserSearch } from '@/api/users';
import Icon from '@/components/Icon';
import UserListItem from '@/components/UserListItem';
import { useDebounce } from '@/hooks/useDebounce';
import {
	CircularProgress,
	InputAdornment,
	List,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';

const EmptyScreen = () => {
	const intl = useIntl();

	return (
		<div className="flex h-full items-center justify-center">
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
	const [search, setSearch] = React.useState('');
	const { data: users, isLoading, trigger } = useUserSearch();

	useDebounce(
		async () => {
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
				}}
				onChange={(e) => setSearch(e.target.value)}
				size="small"
				fullWidth
			/>
			{isLoading ? (
				<LoadingScreen />
			) : !isLoading && users?.length === 0 ? (
				<EmptyScreen />
			) : (
				<List>
					{users?.map((user) => (
						<UserListItem key={user.id} user={user} />
					))}
				</List>
			)}
		</div>
	);
}
