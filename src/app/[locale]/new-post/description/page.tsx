'use client';

import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import TextField from '@/components/TextField';
import { useRouter } from '@/lib/intl/client';
import { post } from '@/validation/post';
import { Form, FormikProvider, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import Image from 'next/image';
import React from 'react';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { useNewPost } from '../NewPostContext';

const initialValues = {
	description: '',
};

const NewPostDescriptionSchema = z.object({
	description: post.description,
});

type NewPostDescriptionFormData = z.infer<typeof NewPostDescriptionSchema>;

export default function NewPostDescription() {
	const intl = useIntl();
	const router = useRouter();
	const { formData, setFormData } = useNewPost();

	const imageUrl = React.useMemo(() => {
		return URL.createObjectURL(formData?.file!);
	}, [formData?.file]);

	const handleBack = () => router.back();

	const handleSubmit = (values: NewPostDescriptionFormData) => {
		setFormData(values);
		router.push('/new-post/loading');
	};

	const formik = useFormik({
		initialValues,
		validate: withZodSchema(NewPostDescriptionSchema),
		onSubmit: handleSubmit,
	});

	return (
		<PageMobile>
			<PageMobileHeader
				title="New Post"
				onBackClick={handleBack}
				confirmLabel={intl.formatMessage({
					id: 'common.share',
					defaultMessage: 'Share',
				})}
				onConfirm={formik.handleSubmit}
			/>
			<div className="h-full-w relative mb-4">
				<Image alt="" src={imageUrl} layout="fill" />
			</div>
			<div className="flex flex-col p-2">
				<FormikProvider value={formik}>
					<Form>
						<TextField
							name="description"
							label={intl.formatMessage({
								id: 'new.post.descriptionLabel',
								defaultMessage: 'Description',
							})}
							placeholder={intl.formatMessage({
								id: 'new.post.descriptionPlaceholder',
								defaultMessage: 'Write a caption...',
							})}
							maxRows={10}
							multiline
							fullWidth
						/>
					</Form>
				</FormikProvider>
			</div>
		</PageMobile>
	);
}
