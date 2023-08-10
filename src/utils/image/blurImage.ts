import { getPlaiceholder } from '@/lib/plaiceholder';

export default async function blurImage(image: Blob, size: number) {
	const arrayBuffer = await image.arrayBuffer();

	const { base64 } = await getPlaiceholder(Buffer.from(arrayBuffer), { size });

	return base64;
}
