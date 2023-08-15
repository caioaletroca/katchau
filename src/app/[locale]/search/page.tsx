'use client';

import { useUserSearch } from '@/api/users';
import BottomNavigation from '@/components/BottomNavigation';
import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import PullToRefresh from '@/components/PullToRefresh';
import SearchTextField from '@/components/SearchTextField';
import UserListItem from '@/components/UserListItem';
import { useSearchTextField } from '@/hooks/useSearchTextField';
import { useRouter } from '@/lib/intl/client';
import getFlatPaginated from '@/utils/searchParams/getFlatPaginated';
import { CircularProgress, List, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

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

export default function SearchPage() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.back();

	const handleSubmit = (path: string) => {
		router.push(path);
	};

	const { search, handleChange, handleClear } = useSearchTextField({
		name: 'name',
		basePath: '/search',
		apiPath: '/users',
		onSubmit: handleSubmit,
	});

	const { data: usersResponse, isLoading } = useUserSearch(
		search ? { name: search } : {}
	);
	const users = getFlatPaginated(usersResponse);

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'search.title',
					defaultMessage: 'Search',
				})}
				onBackClick={handleBack}
			/>
			<div className="flex h-full flex-col px-2">
				<SearchTextField
					value={search}
					onClear={handleClear}
					onChange={handleChange}
				/>
				<PullToRefresh>
					{isLoading && <LoadingScreen />}
					{!isLoading && users?.length === 0 && search !== '' && (
						<EmptyScreen />
					)}
					{!isLoading && users?.length !== 0 && search !== '' && (
						<List>
							{users?.map((user) => (
								<UserListItem key={user.id} user={user} />
							))}
						</List>
					)}
				</PullToRefresh>
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
