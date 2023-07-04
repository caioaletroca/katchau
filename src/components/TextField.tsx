'use client';

import {
	TextField as MuiTextField,
	TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { getIn, useFormikContext } from 'formik';

export default function TextField({
	name,
	helperText,
	disabled,
	...others
}: MuiTextFieldProps) {
	const { values, touched, errors, isSubmitting } = useFormikContext();

	const value = getIn(values, name!);
	const fieldError = getIn(errors, name!);
	const showError = getIn(touched, name!) && !!fieldError;

	return (
		<MuiTextField
			name={name}
			value={value}
			error={showError}
			helperText={showError ? fieldError : helperText}
			disabled={disabled ?? isSubmitting}
			{...others}
		/>
	);
}
