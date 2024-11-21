import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			animation: {
				blob: 'blob 8s infinite'
			},
			keyframes: {
				blob: {
					'0%': { tranform: 'translate(0px, 0px) scale(1.0)' },
					'20%': { transform: 'translate(15px, 3px) scale(1)' },
					'40%': { transform: 'translate(30px, 5px) scale(1)' },
					'60%': { transform: 'translate(0px, 0px) scale(1)' },
					'80%': { transform: 'translate(-20px, -20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' }
				}
			},
			fontFamily: {
				'Gilroy-Black': ['Gilroy-Black', 'sans-serif'],
				'Gilroy-Bold': ['Gilroy-Bold', 'sans-serif'],
				'Gilroy-SemiBold': ['Gilroy-SemiBold', 'sans-serif'],
				'Gilroy-Regular': ['Gilroy-Regular', 'sans-serif'],
				'Gilroy-Light': ['Gilroy-Light', 'sans-serif']
			},
			fontSize: {
				'7.5xl': ['5rem', { lineHeight: '1' }]
			},
			colors: {
				dark: '#303446',
				text: '#c6d0f5',
				teal: '#81c8be',
				flamingo: '#EEBEBE',
				rosewater: '#f2d5cf'
			},
			boxShadow: {
				DEFAULT: '0px 0px 40px 0px rgba(129, 200, 190, 0.3)',
				rosewater: '0px 0px 20px 0px rgba(242, 213, 207, 0.1)',
				flamingo: '0px 0px 20px 0px rgba(238, 190, 190, 0.1)'
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
