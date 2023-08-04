'use client';

import { usePost } from '@/api/posts';
import { useUserProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import Post from '@/components/Post';
import { useRouter } from '@/lib/intl/client';
import { useParams } from 'next/navigation';

export default function Content() {
	const { user_id, post_id } = useParams();
	const router = useRouter();
	const { data: user } = useUser({ user_id });
	const { data: post } = usePost({ user_id, post_id });
	const { data: profileImage, isLoading } = useUserProfileImage({ user_id });

	const handleDelete = () => router.push('/profile');

	if (!user || !post || isLoading) return null;

	return (
		<div className="flex w-full">
			<Post
				user={user}
				post={post}
				profileImage={profileImage}
				onDelete={handleDelete}
			/>
		</div>
	);
}
