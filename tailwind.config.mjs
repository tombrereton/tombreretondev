const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['DM Sans Variable', 'ui-sans-serif', ...defaultTheme.fontFamily.sans],
				'serif': ['ui-serif', 'Georgia'],
				'mono': ['Fira Mono', 'SFMono-Regular'],
				'display-medium': ['Staatliches, system-ui'],
				'pixel': ['Pixelify Sans Variable', 'system-ui']
			},
			colors: {
				yellow: "#FFECA8",
				purple: "#C0A1EF",
				grey: {
					200: "#DDDDDD",
					400: "#6F6F6F",
					600: "#242423"
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
