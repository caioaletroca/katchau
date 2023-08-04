'use client';

import { useDeleteProfileImage, useProfileImage } from '@/api/profileImage';
import { useUser } from '@/api/users';
import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';
import PageMobile from '@/components/Page/PageMobile';
import PageMobileHeader from '@/components/Page/PageMobileHeader';
import SwipeableDrawer from '@/components/SwipeableDrawer';
import TextField from '@/components/TextField';
import { useRouter } from '@/lib/intl/client';
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
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';

const initialValues = {
	name: '',
	username: '',
	bio: '',
};

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
	const { trigger, isMutating: deletingProfileImage } = useDeleteProfileImage({
		onSuccess: () => {
			mutate();
			setOpenDialog(false);
			setOpenDrawer(false);
		},
	});
	const [openDrawer, setOpenDrawer] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);

	if (isLoading) {
		return null;
	}

	const handleSubmit = () => {};

	const formikValues = Object.assign({}, initialValues, user);

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
				onConfirm={handleSubmit}
				onBackClick={() => router.back()}
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
				<Formik
					enableReinitialize
					initialValues={formikValues}
					onSubmit={handleSubmit}>
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
						<TextField
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
							fullWidth
						/>
					</Form>
				</Formik>
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
						onClick={() => trigger()}>
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
