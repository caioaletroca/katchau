import { z } from 'zod';
import { oneLowerCaseLetter, oneNumber, oneUpperCaseLetter, specialCharacters } from './regex';

const username = z.string().regex(specialCharacters);

const name = z.string().trim().regex(specialCharacters).max(255);

const email = z.string().trim().email();

const password = z.string().min(8).max(255).regex(oneUpperCaseLetter).regex(oneLowerCaseLetter).regex(oneNumber);

export const user = {
	username,
	name,
	email,
	password,
};
