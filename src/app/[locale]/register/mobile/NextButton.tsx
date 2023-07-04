import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

export default function NextButton() {
	const intl = useIntl();

	return (
		<div className="mt-8 flex w-full flex-col">
			<Button type="submit" variant="contained">
				{intl.formatMessage({
					id: 'common.nextButton',
					defaultMessage: 'Next',
				})}
			</Button>
		</div>
	);
}
