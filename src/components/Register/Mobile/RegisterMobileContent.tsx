import React from 'react';

export function RegisterMobileContentWrapper(
	props: React.HTMLProps<HTMLDivElement>
) {
	return <div className="flex h-full flex-col p-4" {...props} />;
}

export function RegisterMobileContent(props: React.HTMLProps<HTMLDivElement>) {
	return <div className="flex flex-1 flex-col gap-2" {...props} />;
}
