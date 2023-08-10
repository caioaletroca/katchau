/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([
	{
		images: {
			dangerouslyAllowSVG: true,
			domains: [
				// Storage Localhost
				'localhost',
				// Storage Production
				'cwlieuwgmwcsbydffhja.supabase.co',
				'ui-avatars.com',
			],
		},
		transpilePackages: ['lodash', '@mui/system', '@mui/material'],
		modularizeImports: {
			'@mui/material/?(((\\w*)?/?)*)': {
				transform: '@mui/material/{{ matches.[1] }}/{{member}}',
			},
		},
	},
	withBundleAnalyzer(),
]);
