"use client";

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
	const [formData, _setFormData] = React.useState<FormData>({});

	const setFormData = (data: Partial<FormData>) => {
		_setFormData(prevData => ({ ...prevData, ...data }));
	}

	const handleSubmit = async () => {
		const data = new FormData();
		data.append('image', formData.file!);
		data.append('description', formData.description!);

		const response = await fetch('/api/posts', {
			method: 'POST',
			body: data
		});

		console.log(response);
	}

	console.log(formData);

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
