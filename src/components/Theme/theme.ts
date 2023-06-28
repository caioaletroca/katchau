'use client';

import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#B784FA',
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: () => ({
					userSelect: 'none',
					backgroundImage: 'none',
					boxShadow: 'none',
				}),
			},
		},
	},
});

export default theme;
