'use client';

import { useConversation } from '@/api/messages';
import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import PullToRefresh from '@/components/PullToRefresh';
import { useRouter } from '@/lib/intl/client';
import { List } from '@mui/material';
import { useIntl } from 'react-intl';
import ConversationListItem, {
	ConversationLoading,
} from './ConversationListItem';

function ChatPageLoading() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.push('/');

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'chat.title',
					defaultMessage: 'Conversations',
				})}
				onBackClick={handleBack}
			/>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<ConversationLoading key={index} />
				))}
		</PageMobile>
	);
}

export default function ChatPage() {
	const intl = useIntl();
	const router = useRouter();
	const { data: conversation, isLoading } = useConversation();

	console.log(conversation);

	const handleBack = () => router.push('/');

	if (isLoading) {
		return <ChatPageLoading />;
	}

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'chat.title',
					defaultMessage: 'Conversations',
				})}
				onBackClick={handleBack}
			/>
			<PullToRefresh>
				<List>
					{conversation?.data?.map((item) => (
						<ConversationListItem key={item.id} conversation={item} />
					))}
				</List>
			</PullToRefresh>
			<BottomNavigation />
		</PageMobile>
	);
}
