import { z } from 'zod';
import { oneLowerCaseLetter, oneNumber, oneUpperCaseLetter, regex, specialCharacters } from './regex';

const username = z.string()
	.refine(regex(specialCharacters), { params: { id: 'custom_special_characters' } });

const name = z.string().trim().max(255)
	.refine(regex(specialCharacters), { params: { id: 'custom_special_characters' } });

const email = z.string().trim().email();

const password = z.string().min(8).max(255)
	.refine(regex(oneUpperCaseLetter), { params: { id: 'custom_one_uppercase_letter' } })
	.refine(regex(oneLowerCaseLetter), { params: { id: 'custom_one_lowercase_letter' } })
	.refine(regex(oneNumber), { params: { id: 'custom_one_number' } })

export const user = {
	username,
	name,
	email,
	password,
};
