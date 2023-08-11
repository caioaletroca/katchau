'use client';

import { useCreatePost } from '@/api/posts';
import { useRouter } from '@/lib/intl/client';
import React from 'react';

type FormData = {
	originalFile?: File;
	file?: File;
	description?: string;
};

export const NewPostContext = React.createContext<{
	formData?: FormData;
	loading: boolean;
	setFormData: (data: Partial<FormData>) => void;
	handleSubmit: () => void;
}>({
	loading: false,
	setFormData: () => {},
	handleSubmit: () => {},
});

export function useNewPost() {
	return React.useContext(NewPostContext);
}

type NewPostProviderProps = React.PropsWithChildren;

export function NewPostProvider({ children }: NewPostProviderProps) {
	const router = useRouter();
	const [formData, _setFormData] = React.useState<FormData>({});
	const { trigger, isMutating } = useCreatePost({
		onSuccess: () => router.push('/'),
		onError: () => router.push('/new-post/description'),
	});

	const setFormData = (data: Partial<FormData>) => {
		_setFormData((prevData) => ({ ...prevData, ...data }));
	};

	const handleSubmit = async () => {
		console.log(formData);
		trigger({
			fileName: formData.originalFile?.name,
			description: formData.description,
			image: formData.file,
		});
	};

	return (
		<NewPostContext.Provider
			value={{
				formData,
				loading: isMutating,
				setFormData,
				handleSubmit,
			}}>
			{children}
		</NewPostContext.Provider>
	);
}
