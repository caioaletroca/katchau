type PageMobileProps = React.HTMLProps<HTMLDivElement>;

export default function PageMobile({ className, ...others }: PageMobileProps) {
	return <div className={`flex h-full flex-col ${className}`} {...others} />;
}
