import React from "react";

export function ContentWrapper(props: React.HTMLProps<HTMLDivElement>) {
	return <div className='flex flex-col p-4 h-full' {...props} />
}

export function Content(props: React.HTMLProps<HTMLDivElement>) {
	return <div className='flex flex-col gap-2 flex-1' {...props} />
}
