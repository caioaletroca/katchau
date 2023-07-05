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

	const handleChange = (value: dayjs.Dayjs) => {
		helpers.setValue(value);
	};

	return (
		<MuiDateField
			name={field.name}
			value={field.value}
			onBlur={field.onBlur}
			onChange={handleChange}
			helperText={meta.touched ? meta.error : helperText}
			InputProps={{
				error: meta.touched && !!meta.error,
				...InputProps,
			}}
			{...others}
		/>
	);
}