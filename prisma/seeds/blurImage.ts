import { getPlaiceholder } from '../../src/lib/plaiceholder';

const BLUR_IMAGE_SIZE = 10;

export default async function blurImage(image: Blob) {
	const arrayBuffer = await image.arrayBuffer();

	const { base64 } = await getPlaiceholder(Buffer.from(arrayBuffer), {
		size: BLUR_IMAGE_SIZE,
	});

	return base64;
}
