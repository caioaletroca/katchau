'use client';

import { useConversation } from '@/api/conversations';
import { useFeed } from '@/api/feed';
import { useNotifications } from '@/api/notifications';
import BottomNavigation from '@/components/BottomNavigation';
import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import Post, { PostLoading } from '@/components/Post';
import PullToRefresh from '@/components/PullToRefresh';
import { useRouter } from '@/lib/intl/client';
import getFlatPaginated from '@/utils/searchParams/getFlatPaginated';
import { Badge, Button, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useIntl } from 'react-intl';

// TODO: Fix message RTD on prod

function FeedEmpty() {
	const intl = useIntl();
	const router = useRouter();

	const handleClick = () => router.push('/search');

	return (
		<PageMobile>
			<FeedHeader />
			<div className="flex h-full flex-col items-center justify-center gap-2">
				<Icon className="text-8xl text-neutral-700" name="celebration" />
				<Typography className="mb-2" color="grey" variant="body2">
					{intl.formatMessage({
						id: 'feed.noResultsFound',
						defaultMessage: 'You can start by looking for your friends!',
					})}
				</Typography>
				<Button size="small" onClick={handleClick}>
					{intl.formatMessage({
						id: 'feed.noResultsFoundButton',
						defaultMessage: 'Search for friends',
					})}
				</Button>
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}

function FeedLoading() {
	return (
		<PageMobile>
			<FeedHeader />
			<div className="flex h-full flex-col">
				<PostLoading />
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}

function FeedHeader() {
	const intl = useIntl();
	const router = useRouter();
	const { data: notificationResponse } = useNotifications({
		visualized: false,
		limit: 100,
	});
	const { data: conversationResponse } = useConversation({
		visualized: false,
		limit: 100,
	});

	const notifications = getFlatPaginated(notificationResponse);
	const conversations = getFlatPaginated(conversationResponse);

	const handleNotification = () => router.push('/notifications');

	const handleChat = () => router.push('/chat');

	return (
		<div data-cy="header-home" className="flex flex-row pr-2">
			<div className="flex flex-1 flex-row">
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
			<IconButton data-cy="home-notifications" onClick={handleNotification}>
				<Badge badgeContent={notifications?.length} max={99} color="primary">
					<Icon name="favorite" />
				</Badge>
			</IconButton>
			<IconButton data-cy="home-chat" onClick={handleChat}>
				<Badge badgeContent={conversations?.length} max={99} color="primary">
					<Icon name="chat_bubble" />
				</Badge>
			</IconButton>
		</div>
	);
}

export default function FeedPage() {
	const { data: feed, size, setSize, mutate, isLoading } = useFeed();

	const posts = getFlatPaginated(feed);

	const handleFetchMore = () => {
		if (isLoading) {
			return;
		}

		setSize(size + 1);
	};

	if ((!posts || posts?.length === 0) && isLoading) {
		return <FeedLoading />;
	}

	if (posts?.length === 0) {
		return <FeedEmpty />;
	}

	return (
		<PageMobile>
			<FeedHeader />
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
		</PageMobile>
	);
}
