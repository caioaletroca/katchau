import { Button } from "@mui/material";
import { useIntl } from "react-intl";

export default function NextButton() {
	const intl = useIntl();

	return (
		<div className="flex flex-col mt-8 w-full">
			<Button
				type="submit"
				variant='contained'>
				{intl.formatMessage({
					id: "common.nextButton",
					defaultMessage: "Next"
				})}
			</Button>
		</div>
	);
}
