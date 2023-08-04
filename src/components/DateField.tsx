'use client';

import { DateField as MuiDateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { useField } from 'formik';
import React from 'react';

export default function DateField({
	name,
	InputProps,
	helperText,
	...others
}: React.ComponentProps<typeof MuiDateField>) {
	const [field, meta, helpers] = useField<dayjs.Dayjs>(name!);

	return (
		<MuiDateField
			name={field.name}
			value={field.value}
			onBlur={field.onBlur}
			onChange={(value) => helpers.setValue(value as dayjs.Dayjs)}
			helperText={meta.touched ? meta.error : helperText}
			InputProps={{
				error: meta.touched && !!meta.error,
				...InputProps,
			}}
			{...others}
		/>
	);
}
