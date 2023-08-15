import { z } from 'zod';

const content = z.string().max(512);

export const message = {
	content,
};
