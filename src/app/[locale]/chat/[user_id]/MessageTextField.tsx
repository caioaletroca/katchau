'use client';

import { useCreateMessage } from '@/api/messages';
import Icon from '@/components/Icon';
import TextField from '@/components/TextField';
import { message } from '@/validation/message';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const initialValues = {
	content: '',
};

const MessageTextFieldSchema = z.object({
	content: message.content,
});

type MessageTextFieldFormData = z.infer<typeof MessageTextFieldSchema>;

type MessageTextFieldProps = {
	user_id: string;
	onSubmit?: () => void;
};

export default function MessageTextField({
	user_id,
	onSubmit,
}: MessageTextFieldProps) {
	const intl = useIntl();

	const handleSubmit = (values: MessageTextFieldFormData) => {
		if (values.content === '') {
			return;
		}

		trigger({
			user_id,
			content: values.content,
		});
	};

	const formik = useFormik({
		initialValues,
		validate: withZodSchema(MessageTextFieldSchema),
		onSubmit: handleSubmit,
	});

	const { trigger, isMutating } = useCreateMessage(
		{ user_id },
		{
			onSuccess: () => {
				formik.resetForm();
				onSubmit?.();
			},
		}
	);

	return (
		<div className="flex p-2">
			<FormikProvider value={formik}>
				<Form className="w-full">
					<TextField
						name="content"
						variant="standard"
						placeholder={intl.formatMessage({
							id: 'chat.messagePlaceholder',
							defaultMessage: 'Message...',
						})}
						inputProps={{
							maxLength: 512,
						}}
						InputProps={{
							disableUnderline: true,
							endAdornment: (
								<InputAdornment position="end">
									{isMutating ? (
										<CircularProgress size={24} />
									) : (
										<IconButton type="submit">
											<Icon name="send" />
										</IconButton>
									)}
								</InputAdornment>
							),
						}}
						fullWidth
					/>
				</Form>
			</FormikProvider>
		</div>
	);
}
