"use client";

import { useRouter } from "@/lib/intl/client";
import { Button } from "@mui/material";
import { useIntl } from "react-intl";

export default function LoginButton() {
	const intl = useIntl();
	const router = useRouter();

	const handleClick = () => router.push('/login');

	return (
		<div className="w-full flex justify-center">
			<Button
				onClick={handleClick}>
				{intl.formatMessage({
					id: "register.loginButton",
					defaultMessage: "Already have an account?"
				})}
			</Button>
		</div>
	);
}
