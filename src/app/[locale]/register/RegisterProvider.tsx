'use client';

import { useRegister as useRegisterRequest } from '@/api/register';
import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import dayjs from 'dayjs';
import React from 'react';
import { isMobile } from 'react-device-detect';

enum MobileViews {
	'/register/mobile',
	'/register/mobile/name',
	'/register/mobile/password',
	'/register/mobile/birth',
	'/register/mobile/username',
	'/register/mobile/terms',
	'/register/mobile/profile-picture',
}

type FormData = {
	username: string;
	email: string;
	name: string;
	password: string;
	birth: dayjs.Dayjs;
};

const RegisterContext = React.createContext<{
	formData: Partial<FormData>;
	isRegistering: boolean;
	setFormData: (data: Partial<FormData>) => void;
	handleNext: () => void;
	handleRegister: () => void;
}>({
	formData: {},
	isRegistering: false,
	setFormData: () => {},
	handleNext: () => {},
	handleRegister: () => {},
});

export function useRegister() {
	return React.useContext(RegisterContext);
}

type RegisterProviderProps = React.PropsWithChildren;

export function RegisterProvider({ children }: RegisterProviderProps) {
	const router = useRouter();
	const pathname = useUnlocalizedPathname();
	const [formData, _setFormData] = React.useState({});

	const setFormData = (data: Partial<FormData>) => {
		_setFormData((prev) => ({ ...prev, ...data }));
	};

	const handleNext = () => {
		if (isMobile) {
			const mobileViewsArray = Object.values(MobileViews).filter((v) =>
				isNaN(Number(v))
			);
			const currentIndex = mobileViewsArray.indexOf(pathname);
			const index = Math.min(currentIndex + 1, mobileViewsArray.length - 1);

			router.push(MobileViews[index]);

			return;
		}
	};

	const { trigger, isMutating } = useRegisterRequest({
		onSuccess: handleNext,
	});

	const handleRegister = () => {
		trigger(formData);
	};

	return (
		<RegisterContext.Provider
			value={{
				formData,
				isRegistering: isMutating,
				setFormData,
				handleNext,
				handleRegister,
			}}>
			{children}
		</RegisterContext.Provider>
	);
}
