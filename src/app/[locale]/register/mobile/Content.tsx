import React from 'react';

export function ContentWrapper(props: React.HTMLProps<HTMLDivElement>) {
	return <div className="flex h-full flex-col p-4" {...props} />;
}

export function Content(props: React.HTMLProps<HTMLDivElement>) {
	return <div className="flex flex-1 flex-col gap-2" {...props} />;
}
