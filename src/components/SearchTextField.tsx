import {
	IconButton,
	InputAdornment,
	TextField,
	TextFieldProps,
} from '@mui/material';
import { useIntl } from 'react-intl';
import Icon from './Icon';

type SearchTextFieldProps = TextFieldProps & {
	onClear?: () => void;
};

export default function SearchTextField({
	value,
	onClear,
	...others
}: SearchTextFieldProps) {
	const intl = useIntl();

	return (
		<TextField
			data-cy="search-input"
			name="search"
			value={value}
			placeholder={intl.formatMessage({
				id: 'search.searchFieldPlaceholder',
				defaultMessage: 'Search for someone...',
			})}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Icon name="search" />
					</InputAdornment>
				),
				endAdornment: value !== '' && (
					<InputAdornment position="end">
						<IconButton onClick={onClear}>
							<Icon name="close" />
						</IconButton>
					</InputAdornment>
				),
			}}
			size="small"
			fullWidth
			{...others}
		/>
	);
}
