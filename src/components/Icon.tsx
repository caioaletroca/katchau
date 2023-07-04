export type IconVariant = 'outlined' | 'rounded' | 'sharp';

export type IconProps = React.HTMLProps<HTMLSpanElement> & {
	name?: string;
	fill?: boolean;
	variant?: IconVariant;
};

export default function Icon({
	className,
	name,
	fill,
	variant = 'outlined',
}: IconProps) {
	return (
		<span
			className={`material-symbols-${variant} ${
				fill ? 'material-symbols-fill' : ''
			} ${className ?? ''}`}>
			{name}
		</span>
	);
}
