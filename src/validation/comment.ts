import { z } from 'zod';

const content = z.string().min(1);

export const comment = {
	content,
};
