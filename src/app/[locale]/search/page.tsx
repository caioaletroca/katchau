'use client';

import { useUserSearch } from '@/api/users';
import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import PageMobileMessage from '@/components/Page/PageMobileMesssage';
import PullToRefresh from '@/components/PullToRefresh';
import SearchTextField from '@/components/SearchTextField';
import UserListItem from '@/components/UserListItem';
import { useSearchTextField } from '@/hooks/useSearchTextField';
import { useRouter } from '@/lib/intl/client';
import getFlatPaginated from '@/utils/searchParams/getFlatPaginated';
import { CircularProgress, List } from '@mui/material';
import { useIntl } from 'react-intl';

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
		search ? { name: search, limit: 20 } : {}
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
			<div className="flex flex-1 flex-col overflow-y-auto px-2">
				<SearchTextField
					className="mb-2"
					value={search}
					onClear={handleClear}
					onChange={handleChange}
				/>
				<PullToRefresh>
					{isLoading && <LoadingScreen />}
					{!isLoading && users?.length === 0 && search !== '' && (
						<PageMobileMessage
							data-cy="search-empty"
							icon="search_off"
							message={intl.formatMessage({
								id: 'search.noResultsFound',
								defaultMessage: 'No results found',
							})}
						/>
					)}
					{!isLoading && users?.length !== 0 && search !== '' && (
						<List data-cy="search-results">
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
