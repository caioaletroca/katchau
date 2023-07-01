"use client";

import { PostWithImage } from "@/types/posts";
import getStoragePath from "@/utils/storage/getStoragePath";
import { User } from "@prisma/client";
import Image from "next/image";
import PostHeader from "./PostHeader";

type PostProps = {
	user: User,
	post: PostWithImage
	onDelete?: () => void;
}

export default async function Post({ user, post, onDelete }: PostProps) {
	return (
		<div className="flex flex-col w-full">
			<PostHeader
				user={user}
				post_id={post.id}
				onDelete={onDelete}
			/>
			<Image
				alt=""
				width={window.innerWidth}
				height={window.innerWidth}
				src={getStoragePath('posts', post.images[0].url)}
			/>
		</div>
	);
}
