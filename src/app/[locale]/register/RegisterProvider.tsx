"use client";

import React from "react";

type FormData = {
	username: string;
	name: string;
	password: string;
	birth: Date;
}

const RegisterContext = React.createContext<{
	formData: Partial<FormData>;
	setFormData: (data: Partial<FormData>) => void;
}>({
	formData: {},
	setFormData: () => {}
});

export function useRegister() {
	return React.useContext(RegisterContext);
}

type RegisterProviderProps = React.PropsWithChildren;

export function RegisterProvider({
	children
}: RegisterProviderProps) {
	const [formData, _setFormData] = React.useState({});

	const setFormData = (data: Partial<FormData>) => {
		_setFormData(prev => ({ ...prev, ...data }));
	}

	return (
		<RegisterContext.Provider
			value={{
				formData,
				setFormData
			}}>
			{children}
		</RegisterContext.Provider>
	);
}
