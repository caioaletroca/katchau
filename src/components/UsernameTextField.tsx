'use client';

import useValidateUsername from '@/hooks/useValidateUsername';
import messages from '@/lib/zod/messages';
import {
	CircularProgress,
	InputAdornment,
	TextField,
	TextFieldProps,
} from '@mui/material';
import { useField } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import Icon from './Icon';

type UsernameTextFieldProps = TextFieldProps & {
	loading?: boolean;
	showValidation?: boolean;
	valid?: boolean;
};

export default function UsernameTextField({
	name,
	loading: propLoading,
	showValidation,
	valid: propValid,
	helperText: propHelperText,
	InputProps,
	...others
}: UsernameTextFieldProps) {
	const intl = useIntl();
	const [localError, setLocalError] = React.useState<string>();
	const [field, meta] = useField<string>(name!);
	const { data, isMutating } = useValidateUsername(meta.value);

	const show = showValidation ?? meta.touched;
	const loading = propLoading ?? isMutating;
	const valid = meta.initialValue === meta.value || data?.valid;
	const error = meta.touched && (!!localError || !!meta.error);
	const helperText =
		meta.touched && !loading ? localError ?? meta.error : propHelperText;

	React.useEffect(() => {
		if (valid === false) {
			setLocalError(intl.formatMessage(messages.custom_username_exists));
		} else {
			setLocalError(undefined);
		}
	}, [intl, valid, data]);

	return (
		<TextField
			error={error}
			helperText={helperText}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						{show && loading && <CircularProgress size={24} />}
						{show && !loading && valid && (
							<Icon className="text-success-main" name="check_circle" fill />
						)}
						{show && !loading && !valid && (
							<Icon className="text-error-main" name="cancel" fill />
						)}
					</InputAdornment>
				),
				...InputProps,
			}}
			{...field}
			{...others}
		/>
	);
}
