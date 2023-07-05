'use client';

import React from 'react';
import dayjs from 'dayjs';
import { DateField as MuiDateField } from '@mui/x-date-pickers/DateField';
import { useField } from 'formik';

export default function DateField({
	name,
	InputProps,
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
			helperText={meta.touched ? meta.error : ''}
			InputProps={{
				error: meta.touched && !!meta.error,
				...InputProps,
			}}
			{...others}
		/>
	);
}
