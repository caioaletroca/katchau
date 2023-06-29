"use client";

import React from "react";
import { NewPostProvider } from "./NewPostContext";

export default function RootLayout({
	children
}: React.PropsWithChildren) {
	return (
		<NewPostProvider>
			{children}
		</NewPostProvider>
	)
}
