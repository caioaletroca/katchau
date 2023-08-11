'use client';

import { usePost, useUpdatePost } from '@/api/posts';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import TextField from '@/components/TextField';
import { useRouter } from '@/lib/intl/client';
import getFormikValues from '@/utils/form/getFormikValues';
import getStoragePath from '@/utils/storage/getStoragePath';
import { post } from '@/validation/post';
import { Skeleton } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function PostEditPageLoading() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'post.edit.title',
					defaultMessage: 'Post Edit',
				})}
				onBackClick={handleBack}
			/>
			<Skeleton className="h-full-w mb-2 w-full" variant="rectangular" />
			<div className="flex flex-col p-2">
				<Skeleton className="w-full" variant="rectangular" height={32} />
			</div>
		</PageMobile>
	);
}

const initialValues = {
	description: '',
};

const PostEditSchema = z.object({
	description: post.description,
});

type PostEditFormData = z.infer<typeof PostEditSchema>;

export default function PostEditPage() {
	const intl = useIntl();
	const router = useRouter();
	const { user_id, post_id } = useParams();
	const { data: post, isLoading } = usePost({ user_id, post_id });
	const { trigger, isMutating: updatePostLoading } = useUpdatePost(
		{ post_id },
		{
			onSuccess: () => router.push(`/post/${user_id}/${post_id}`),
		}
	);

	const handleBack = () => router.back();

	const handleSave = (values: PostEditFormData) => trigger(values);

	const formikValues = getFormikValues(initialValues, post, ['description']);

	const formik = useFormik({
		initialValues: formikValues,
		enableReinitialize: true,
		validate: withZodSchema(PostEditSchema),
		onSubmit: handleSave,
	});

	if (isLoading) {
		return <PostEditPageLoading />;
	}

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'post.edit.title',
					defaultMessage: 'Post Edit',
				})}
				disabled={updatePostLoading}
				loading={updatePostLoading}
				confirmLabel={intl.formatMessage({
					id: 'common.save',
					defaultMessage: 'Save',
				})}
				onConfirm={formik.handleSubmit}
				onBackClick={handleBack}
			/>
			<div className="h-full-w relative mb-4">
				<Image
					alt={intl.formatMessage({
						id: 'post.postImageAlt',
						defaultMessage: 'Image of your post',
					})}
					placeholder="blur"
					blurDataURL={post?.images[0].blur!}
					src={getStoragePath('posts', post?.images[0].url)!}
					layout="fill"
				/>
			</div>
			<div className="flex flex-col p-2">
				<FormikProvider value={formik}>
					<TextField
						name="description"
						label={intl.formatMessage({
							id: 'post.descriptionLabel',
							defaultMessage: 'Description',
						})}
						placeholder={intl.formatMessage({
							id: 'post.descriptionPlaceholder',
							defaultMessage: 'Write a caption...',
						})}
						maxRows={10}
						multiline
						fullWidth
					/>
				</FormikProvider>
			</div>
		</PageMobile>
	);
}
