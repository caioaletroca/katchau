'use client';

import { useConversation } from '@/api/conversations';
import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import PullToRefresh from '@/components/PullToRefresh';
import SearchTextField from '@/components/SearchTextField';
import { useSearchTextField } from '@/hooks/useSearchTextField';
import { useRouter } from '@/lib/intl/client';
import getFlatPaginated from '@/utils/searchParams/getFlatPaginated';
import { List } from '@mui/material';
import { useIntl } from 'react-intl';
import ConversationListItem, {
	ConversationLoading,
} from './ConversationListItem';

function ChatPageLoading() {
	return (
		<>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<ConversationLoading key={index} />
				))}
		</>
	);
}

export default function ChatPage() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.push('/');

	const handleSubmit = (path: string) => {
		router.push(path);
	};

	const { search, handleChange, handleClear } = useSearchTextField({
		name: 'name',
		basePath: '/chat',
		onSubmit: handleSubmit,
	});

	const {
		data: conversationResponse,
		isLoading,
		size,
		setSize,
	} = useConversation(
		search
			? {
					name: search,
			  }
			: {}
	);

	const conversation = getFlatPaginated(conversationResponse);

	const handleFetchMore = () => {
		setSize(size + 1);
	};

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'chat.title',
					defaultMessage: 'Conversations',
				})}
				onBackClick={handleBack}
			/>
			<div className="p-2">
				<SearchTextField
					value={search}
					onClear={handleClear}
					onChange={handleChange}
				/>
			</div>
			<PullToRefresh onFetchMore={handleFetchMore}>
				{isLoading && <ChatPageLoading />}
				{!isLoading && (
					<List>
						{conversation?.map((item) => (
							<ConversationListItem key={item.id} conversation={item} />
						))}
					</List>
				)}
			</PullToRefresh>
			<BottomNavigation />
		</PageMobile>
	);
}
