export type IconVariant = 'outlined' | 'rounded' | 'sharp';

export type IconProps = React.HTMLProps<HTMLSpanElement> & {
	name?: string;
	variant?: IconVariant;
};

export default function Icon({
	className,
	name,
	variant = 'outlined',
}: IconProps) {
	return (
		<span className={`material-symbols-${variant} ${className}`}>{name}</span>
	);
}
