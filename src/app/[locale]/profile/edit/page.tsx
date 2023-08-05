'use client';

import { useUpdateProfile } from '@/api/profile';
import { useDeleteProfileImage, useProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import SwipeableDrawer from '@/components/SwipeableDrawer';
import TextField from '@/components/TextField';
import UsernameTextField from '@/components/UsernameTextField';
import { useRouter } from '@/lib/intl/client';
import { user } from '@/validation/user';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const initialValues = {
	name: '',
	username: '',
	bio: '',
};

const ProfileSchema = z.object({
	name: user.name,
	username: user.username,
	bio: user.bio,
});

type ProfileData = z.infer<typeof ProfileSchema>;

function ProfileEditPageLoading() {
	const intl = useIntl();
	const router = useRouter();

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'profile.edit.title',
					defaultMessage: 'Edit profile',
				})}
				confirmLabel={intl.formatMessage({
					id: 'common.save',
					defaultMessage: 'Save',
				})}
				onBackClick={() => router.push('/profile')}
			/>
			<div className="mb-4 flex flex-col items-center justify-center gap-4 p-4">
				<Skeleton variant="circular" width={56} height={56} />
			</div>
			<div className="flex flex-col gap-4 p-2">
				<Skeleton variant="rectangular" height={40} />
				<Skeleton variant="rectangular" height={40} />
				<Skeleton variant="rectangular" height={40} />
			</div>
		</PageMobile>
	);
}

export default function ProfileEditPage() {
	const intl = useIntl();
	const router = useRouter();
	const { data: session } = useSession();
	const { data: user, isLoading } = useUser({ user_id: session?.user.id });
	const {
		data: profileImage,
		isLoading: profileImageLoading,
		mutate,
	} = useProfileImage();
	const { trigger: updateProfile, isMutating: updatingProfile } =
		useUpdateProfile({
			onSuccess: () => router.push('/profile'),
		});
	const { trigger: deleteProfileImage, isMutating: deletingProfileImage } =
		useDeleteProfileImage({
			onSuccess: () => {
				mutate();
				setOpenDialog(false);
				setOpenDrawer(false);
			},
		});
	const [openDrawer, setOpenDrawer] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);

	const handleSubmit = (values: ProfileData) => {
		updateProfile(values);
	};

	const formikValues = Object.assign({}, initialValues, {
		name: user?.name,
		username: user?.username,
		bio: user?.bio,
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: formikValues,
		validate: withZodSchema(ProfileSchema),
		onSubmit: handleSubmit,
	});

	if (isLoading) {
		return <ProfileEditPageLoading />;
	}

	return (
		<PageMobile>
			<PageMobileHeader
				title={intl.formatMessage({
					id: 'profile.edit.title',
					defaultMessage: 'Edit profile',
				})}
				confirmLabel={intl.formatMessage({
					id: 'common.save',
					defaultMessage: 'Save',
				})}
				disabled={updatingProfile}
				loading={updatingProfile}
				onConfirm={formik.handleSubmit}
				onBackClick={() => router.push('/profile')}
			/>
			<div className="mb-4 flex flex-col items-center justify-center gap-4 p-4">
				<Avatar name={user?.name!} url={profileImage?.url} />
				<Button
					className="m-auto"
					variant="outlined"
					size="small"
					onClick={() => setOpenDrawer(true)}>
					{intl.formatMessage({
						id: 'common.edit',
						defaultMessage: 'Edit',
					})}
				</Button>
			</div>
			<div className="flex flex-col gap-4 p-2">
				<FormikProvider value={formik}>
					<Form className="flex flex-col gap-4">
						<TextField
							name="name"
							label={intl.formatMessage({
								id: 'common.name',
								defaultMessage: 'Full name',
							})}
							size="small"
							fullWidth
						/>
						<UsernameTextField
							name="username"
							label={intl.formatMessage({
								id: 'common.username',
								defaultMessage: 'Username',
							})}
							size="small"
							fullWidth
						/>
						<TextField
							name="bio"
							label={intl.formatMessage({
								id: 'common.bio',
								defaultMessage: 'Bio',
							})}
							size="small"
							maxRows={4}
							multiline
							fullWidth
						/>
					</Form>
				</FormikProvider>
			</div>
			<SwipeableDrawer
				anchor="bottom"
				open={openDrawer}
				onOpen={() => setOpenDrawer(true)}
				onClose={() => setOpenDrawer(false)}>
				<List>
					<ListItemButton
						onClick={() => router.push('/profile/edit/profile-picture')}>
						<ListItemIcon>
							<Icon name="image" />
						</ListItemIcon>
						<ListItemText
							primary={intl.formatMessage({
								id: 'profile.edit.addNewProfilePicture',
								defaultMessage: 'New profile picture',
							})}
						/>
					</ListItemButton>
					{profileImage && (
						<ListItemButton onClick={() => setOpenDialog(true)}>
							<ListItemIcon>
								<Icon name="delete" />
							</ListItemIcon>
							<ListItemText
								primary={intl.formatMessage({
									id: 'profile.edit.deleteProfilePicture',
									defaultMessage: 'Remove current picture',
								})}
							/>
						</ListItemButton>
					)}
				</List>
			</SwipeableDrawer>
			<Dialog
				open={openDialog}
				onClose={deletingProfileImage ? () => setOpenDialog(false) : undefined}>
				<DialogContent>
					<DialogContentText>
						{intl.formatMessage({
							id: 'profile.edit.deleteProfilePicture.dialogTitle',
							defaultMessage: 'Remove profile picture?',
						})}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						disabled={deletingProfileImage}
						onClick={() => setOpenDialog(false)}>
						{intl.formatMessage({
							id: 'common.cancel',
							defaultMessage: 'Cancel',
						})}
					</Button>
					<LoadingButton
						loading={deletingProfileImage}
						color="error"
						onClick={() => deleteProfileImage()}>
						{intl.formatMessage({
							id: 'common.confirm',
							defaultMessage: 'Confirm',
						})}
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</PageMobile>
	);
}
