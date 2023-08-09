import { z } from 'zod';

const content = z.string().min(1).max(512);

export const comment = {
	content,
};
