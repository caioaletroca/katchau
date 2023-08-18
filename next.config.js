/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const isTest = process.env.NODE_ENV === 'test';

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
		compiler: {
			reactRemoveProperties: isTest
				? {}
				: { properties: ['^data-cy$', '^data-state$'] },
		},
	},
	withPWA({
		dest: 'public',
	}),
	withBundleAnalyzer(),
]);
