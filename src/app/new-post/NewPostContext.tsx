"use client";

import api from "@/api";
import { useRouter } from "next/navigation";
import React from "react";

type FormData = {
	originalFile?: File,
	file?: File
	description?: string;
}

export const NewPostContext = React.createContext<{
	formData?: FormData;
	setFormData: (data: Partial<FormData>) => void;
	handleSubmit: () => void;
}>({
	setFormData: () => {},
	handleSubmit: () => {}
});

export function useNewPost() {
	return React.useContext(NewPostContext);
}

type NewPostProviderProps = React.PropsWithChildren;

export function NewPostProvider({ children }: NewPostProviderProps) {
	const router = useRouter();
	const [formData, _setFormData] = React.useState<FormData>({});

	const setFormData = (data: Partial<FormData>) => {
		_setFormData(prevData => ({ ...prevData, ...data }));
	}

	const handleSubmit = async () => {
		const data = new FormData();
		data.append('image', formData.file!);
		data.append('description', formData.description!);

		try {
			await api.post('/posts', data);

			router.push('/');
		}
		catch (error) {
			router.push('/new-post/description');
		}
	}

	return (
		<NewPostContext.Provider value={{
			formData,
			setFormData,
			handleSubmit
		}}>
			{children}
		</NewPostContext.Provider>
	)
}
