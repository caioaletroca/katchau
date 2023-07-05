'use client';

import tailwindConfigModule from '@/../tailwind.config.js';
import createTheme from '@mui/material/styles/createTheme';
import resolveConfig from 'tailwindcss/resolveConfig';

const tailwindConfig = resolveConfig(tailwindConfigModule);

const theme = createTheme({
	palette: {
		mode: 'dark',
		...tailwindConfig?.theme?.colors,
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
