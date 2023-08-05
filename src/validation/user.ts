import dayjs from 'dayjs';
import { z } from 'zod';
import date from './datetime';
import {
	oneLowerCaseLetter,
	oneNumber,
	oneUpperCaseLetter,
	regex,
	specialCharacters,
} from './regex';

const username = z
	.string()
	.min(1)
	.max(60)
	.refine(regex(/^[a-zA-Z0-9.]*$/), {
		params: { id: 'custom_special_characters' },
	});

const name = z
	.string()
	.trim()
	.max(255)
	.refine(regex(specialCharacters), {
		params: { id: 'custom_special_characters' },
	});

const email = z.string().trim().email();

const bio = z.string().max(512);

const password = z
	.string()
	.min(8)
	.max(255)
	.refine(regex(oneUpperCaseLetter), {
		params: { id: 'custom_one_uppercase_letter' },
	})
	.refine(regex(oneLowerCaseLetter), {
		params: { id: 'custom_one_lowercase_letter' },
	})
	.refine(regex(oneNumber), { params: { id: 'custom_one_number' } });

const birth = date.type
	.superRefine(date.min('1900-01-01'))
	.superRefine(date.max(dayjs()));

export const user = {
	username,
	name,
	email,
	password,
	bio,
	birth,
};
