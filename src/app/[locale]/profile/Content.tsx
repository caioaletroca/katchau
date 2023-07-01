"use client";

import api from "@/api";
import { Grid } from "@mui/material";
import { Post, Prisma } from "@prisma/client";
import getStoragePath from "@/utils/storage/getStoragePath";
import Image from "next/image";

const postWithImage = Prisma.validator<Prisma.PostArgs>()({
	include: { images: true }
});

type PostWithImage = Prisma.PostGetPayload<typeof postWithImage>;

export default async function Content() {
	const { data: posts } = await api.get<PostWithImage[]>('/posts');

	return (
		<>
			<Grid container spacing={0.5}>
				{posts.map((post) => (
					<Grid key={post.id} item xs={4}>
						<Image
							key={post.id}
							alt=""
							width={window.innerWidth / 3}
							height={window.innerWidth / 3}
							src={getStoragePath('posts', post?.images[0]?.url)}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
}
