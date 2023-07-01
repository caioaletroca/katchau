"use client";

import React from "react";
import { useIntl } from "react-intl";
import PageMobile from "@/components/Page/PageMobile";
import PageMobileHeader from "@/components/Page/PageMobileHeader";
import { useRouter } from "@/lib/intl/client";
import Content from "./Content";

export default function PostPage() {
	const intl = useIntl();
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<PageMobile>
			<PageMobileHeader
				onBackClick={handleBack}
				title={intl.formatMessage({
					id: "post.title",
					defaultMessage: "Post"
				})}
			/>
			<React.Suspense>
				{/* @ts-expect-error Server Component */}
				<Content />
			</React.Suspense>
		</PageMobile>
	);
}
