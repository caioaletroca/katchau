"use client";

import api from "@/api";
import getStoragePath from "@/utils/storage/getStoragePath";
import Image from "next/image";
import { useParams } from "next/navigation";

export default async function Content() {
	const { user_id, post_id } = useParams();
	const { data: user } = await api.get(`/users/${user_id}/posts/${post_id}`);

	console.log(user);

	return (
		<div className="flex w-full">
			<Image
				alt=""
				width={window.innerWidth}
				height={window.innerWidth}
				src={getStoragePath('posts', user.posts[0].images[0].url)}
			/>
		</div>
	);
}
