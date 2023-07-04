import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import React from "react";
import Icon from "./Icon";
import TextField from "./TextField";

export default function PasswordTextField({
	InputProps,
	...others
}: TextFieldProps) {
	const [visibility, setVisibility] = React.useState(false);

	return (
		<TextField
			type={visibility ? 'text': 'password'}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<IconButton onClick={() => setVisibility(visibility => !visibility)}>
							<Icon name={visibility ? "visibility_off" : "visibility"} />
						</IconButton>
					</InputAdornment>
				),
				...InputProps
			}}
			{...others}
		/>
	);
}
