"use client";

import api from "@/api";
import Post from "@/components/Post";
import useRouter from "@/lib/intl/client'";;
import { useParams } from "next/navigation";

export default async function Content() {
	const { user_id, post_id } = useParams();
	const router = useRouter();
	const { data: user } = await api.get(`/users/${user_id}`);
	const { data: post } = await api.get(`/users/${user_id}/posts/${post_id}`);

	const handleDelete = () => router.push('/profile');

	return (
		<div className="flex w-full">
			{/* @ts-expect-error Server Component */}
			<Post
				user={user}
				post={post}
				onDelete={handleDelete}
			/>
		</div>
	);
}
