import { z } from 'zod';

const username = z.string();

const password = z.string();

export const user = {
	username,
	password,
};
