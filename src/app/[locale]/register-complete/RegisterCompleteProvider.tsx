'use client';

import { useUpdateProfile } from '@/api/profile';
import { useRouter, useUnlocalizedPathname } from '@/lib/intl/client';
import dayjs from 'dayjs';
import React from 'react';
import { isMobile } from 'react-device-detect';

enum MobileViews {
	'/register-complete/mobile',
	'/register-complete/mobile/username',
	'/register-complete/mobile/terms',
	'/register-complete/mobile/profile-picture',
}

type FormData = {
	username: string;
	birth: dayjs.Dayjs;
};

const RegisterCompleteContext = React.createContext<{
	formData: Partial<FormData>;
	isSubmitting: boolean;
	setFormData: (data: Partial<FormData>) => void;
	handleNext: () => void;
	handleSubmit: () => void;
}>({
	formData: {},
	isSubmitting: false,
	setFormData: () => {},
	handleNext: () => {},
	handleSubmit: () => {},
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

	const { trigger, isMutating } = useUpdateProfile({
		onSuccess: handleNext,
	});

	const handleSubmit = () => {
		trigger(formData);
	};

	return (
		<RegisterCompleteContext.Provider
			value={{
				formData,
				isSubmitting: isMutating,
				setFormData,
				handleNext,
				handleSubmit,
			}}>
			{children}
		</RegisterCompleteContext.Provider>
	);
}
