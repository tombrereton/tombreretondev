import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'Gilroy-Black': ['Gilroy-Black', 'sans-serif']
			},
			fontSize: {
				'7.5xl': ['5rem', { lineHeight: '1' }]
			},
			colors: {
				base: '#303446',
				text: '#c6d0f5',
				teal: '#81c8be'
			},
			boxShadow: {
				DEFAULT: '0px 0px 40px 0px rgba(129, 200, 190, 0.3)'
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
