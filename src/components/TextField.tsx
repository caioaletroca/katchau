'use client';

import {
	TextField as MuiTextField,
	TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { useField } from 'formik';

export default function TextField({
	name,
	helperText,
	...others
}: MuiTextFieldProps) {
	const [field, meta] = useField(name!);

	return (
		<MuiTextField
			error={meta.touched && !!meta.error}
			helperText={meta.touched ? meta.error : helperText}
			{...field}
			{...others}
		/>
	);
}
