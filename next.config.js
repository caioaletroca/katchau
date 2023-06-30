/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

// TODO: Fix translations

module.exports = withPlugins([
    {
			images: {
				domains: ['cwlieuwgmwcsbydffhja.supabase.co'],
			},
			transpilePackages: ["lodash", "@mui/system", "@mui/material"],
			modularizeImports: {
				"@mui/material/?(((\\w*)?/?)*)": {
					transform: "@mui/material/{{ matches.[1] }}/{{member}}",
				}
			}
    },
    withBundleAnalyzer(),
    // nextTranslate()
]);
