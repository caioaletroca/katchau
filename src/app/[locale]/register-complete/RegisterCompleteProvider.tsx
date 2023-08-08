'use client';

import { useRegister as useRegisterRequest } from '@/api/register';
import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import dayjs from 'dayjs';
import React from 'react';
import { isMobile } from 'react-device-detect';

enum MobileViews {
	'/register/mobile/birth',
	'/register/mobile/username',
	'/register/mobile/terms',
	'/register/mobile/profile-picture',
}

type FormData = {
	username: string;
	birth: dayjs.Dayjs;
};

const RegisterCompleteContext = React.createContext<{
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

export function useRegisterComplete() {
	return React.useContext(RegisterCompleteContext);
}

type RegisterCompleteProviderProps = React.PropsWithChildren;

export function RegisterCompleteProvider({
	children,
}: RegisterCompleteProviderProps) {
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
		<RegisterCompleteContext.Provider
			value={{
				formData,
				isRegistering: isMutating,
				setFormData,
				handleNext,
				handleRegister,
			}}>
			{children}
		</RegisterCompleteContext.Provider>
	);
}
