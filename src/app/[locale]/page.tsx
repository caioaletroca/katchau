'use client';

import { useFeed } from '@/api/feed';
import BottomNavigation from '@/components/BottomNavigation';
import Post from '@/components/Post';
import PullToRefresh from '@/components/PullToRefresh';
import Image from 'next/image';
import { useIntl } from 'react-intl';

function HomeHeader() {
	const intl = useIntl();

	return (
		<div className="flex flex-row">
			<div className="relative flex h-14 w-28">
				<Image
					alt={intl.formatMessage({
						id: 'home.logoAlt',
						defaultMessage: 'Katchau home logo',
					})}
					fill
					src="/text-inverted.svg"
				/>
			</div>
		</div>
	);
}

export default function Home() {
	const { data: feed, size, setSize, mutate, isLoading } = useFeed();

	const posts = feed?.map((f) => f.data).flat();

	const handleFetchMore = () => {
		if (isLoading) {
			return;
		}

		setSize(size + 1);
	};

	return (
		<div className="flex h-full flex-col">
			<HomeHeader />
			<PullToRefresh
				onRefresh={() => mutate()}
				loadingFetchMore={isLoading}
				onFetchMore={handleFetchMore}>
				{posts?.map((post) => (
					<Post
						key={post.id}
						user={post.user}
						profileImage={post.user.profile_picture[0]}
						post={post}
					/>
				))}
			</PullToRefresh>
			<BottomNavigation />
		</div>
	);
}
