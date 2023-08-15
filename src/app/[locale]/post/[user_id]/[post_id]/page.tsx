'use client';

import { usePost } from '@/api/posts';
import { useUserProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import BottomNavigation from '@/components/BottomNavigation';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import PageMobileMessage from '@/components/Page/PageMobileMesssage';
import Post from '@/components/Post';
import { useRouter } from '@/lib/intl/client';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';

type PostErrorPageProps = {
	error: 'user' | 'post';
};

function PostErrorPage({ error }: PostErrorPageProps) {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
				title={intl.formatMessage({
					id: 'post.title',
					defaultMessage: 'Posts',
				})}
			/>
			<PageMobileMessage
				icon="draft"
				message={
					error === 'user'
						? intl.formatMessage({
								id: 'post.error.userNotFound',
								defaultMessage: 'User not found',
						  })
						: intl.formatMessage({
								id: 'post.error.postNotFound',
								defaultMessage: 'Post not found',
						  })
				}
			/>
			<BottomNavigation />
		</PageMobile>
	);
}

export default function PostPage() {
	const intl = useIntl();
	const router = useRouter();
	const { user_id, post_id } = useParams();
	const {
		data: user,
		error: userError,
		isLoading: userLoading,
	} = useUser({ user_id });
	const {
		data: post,
		error: postError,
		isLoading: postLoading,
	} = usePost({ user_id, post_id });
	const { data: profileImage, isLoading } = useUserProfileImage({ user_id });

	const handleBack = () => router.back();

	const handleDelete = () => router.push('/profile');

	if (userLoading || postLoading || isLoading) {
		return null;
	}

	if (userError || postError) {
		return <PostErrorPage error={userError ? 'user' : 'post'} />;
	}

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
				title={intl.formatMessage({
					id: 'post.title',
					defaultMessage: 'Posts',
				})}
			/>
			<div className="flex w-full flex-1 flex-col">
				<Post
					user={user!}
					post={post!}
					profileImage={profileImage as any}
					onDelete={handleDelete}
				/>
			</div>
			<BottomNavigation />
		</PageMobile>
	);
}
