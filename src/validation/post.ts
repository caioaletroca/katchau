import { z } from 'zod';

const description = z.string().max(512);

export const post = {
	description,
};
