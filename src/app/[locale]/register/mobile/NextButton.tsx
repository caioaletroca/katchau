'use client';

import { Button, ButtonProps } from '@mui/material';
import { useIntl } from 'react-intl';

export default function NextButton(props: ButtonProps) {
	const intl = useIntl();

	return (
		<div className="mt-8 flex w-full flex-col">
			<Button type="submit" variant="contained" {...props}>
				{intl.formatMessage({
					id: 'common.nextButton',
					defaultMessage: 'Next',
				})}
			</Button>
		</div>
	);
}
