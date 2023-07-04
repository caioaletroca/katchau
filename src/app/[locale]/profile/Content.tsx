"use client";

import { Grid } from "@mui/material";
import getStoragePath from "@/utils/storage/getStoragePath";
import Image from "next/image";
import { useRouter } from "@/lib/intl/client";
import { PostWithImage } from "@/types/posts";
import { usePosts } from "@/api/posts";

type ContentProps = {
	user_id: string;
}

export default function Content({ user_id }: ContentProps) {
	const router = useRouter();
	const { data: posts } = usePosts({ user_id });

	const handleClick = (post: PostWithImage) => {
		router.push(`/post/${post.user_id}/${post.id}`);
	}

	return (
		<>
			<Grid container spacing={0.5}>
				{posts?.map((post) => (
					<Grid key={post.id} item xs={4}>
						<Image
							key={post.id}
							alt=""
							width={window.innerWidth / 3}
							height={window.innerWidth / 3}
							src={getStoragePath('posts', post?.images[0]?.url)}
							onClick={() => handleClick(post)}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
}
