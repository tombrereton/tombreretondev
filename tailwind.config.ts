import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			screens: {
				'2xl': '1440px'
			}
		},
		extend: {
			fontFamily: {
				'Gilroy-Black': ['Gilroy-Black', 'sans-serif'],
				'Gilroy-Bold': ['Gilroy-Bold', 'sans-serif'],
				'Gilroy-SemiBold': ['Gilroy-SemiBold', 'sans-serif'],
				'Gilroy-Regular': ['Gilroy-Regular', 'sans-serif'],
				'Gilroy-Light': ['Gilroy-Light', 'sans-serif'],
				sans: ['Inter', ...fontFamily.sans],
				mono: ['Source Code Pro', ...fontFamily.mono],
				alt: ['Courier', ...fontFamily.sans]
			},
			fontSize: {
				xxs: '10px'
			},
			colors: {
				grey: '#303446',
				mantle: '#292c3c',
				crust: '#232634',
				text: '#c6d0f5',
				subtext1: '#b5bfe2',
				subtext0: '#a5adce',
				overlay2: '#949cbb',
				overlay1: '#838ba7',
				overlay0: '#737994',
				surface2: '#626880',
				teal: '#81c8be',
				flamingo: '#EEBEBE',
				rosewater: '#f2d5cf',
				maroon: '#ea999c',
				peach: '#ef9f76',
				border: {
					DEFAULT: 'hsl(var(--border-card))',
					input: 'hsl(var(--border-input))',
					'input-hover': 'hsl(var(--border-input-hover))'
				},
				background: {
					DEFAULT: 'hsl(var(--background) / <alpha-value>)',
					alt: 'hsl(var(--background-alt) / <alpha-value>)'
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground) / <alpha-value>)',
					alt: 'hsl(var(--foreground-alt) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground))'
				},
				dark: {
					DEFAULT: 'hsl(var(--dark) / <alpha-value>)',
					4: 'hsl(var(--dark-04))',
					10: 'hsl(var(--dark-10))',
					40: 'hsl(var(--dark-40))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)'
				},
				contrast: {
					DEFAULT: 'hsl(var(--contrast) / <alpha-value>)'
				}
			},
			boxShadow: {
				DEFAULT: '0px 0px 20px 0px rgba(129, 200, 190, 0.3)',
				big: '0px 0px 40px 0px rgba(129, 200, 190, 0.3)',
				rosewater: '0px 0px 20px 0px rgba(242, 213, 207, 0.1)',
				mini: 'var(--shadow-mini)',
				'mini-inset': 'var(--shadow-mini-inset)',
				popover: 'var(--shadow-popover)',
				kbd: 'var(--shadow-kbd)',
				btn: 'var(--shadow-btn)',
				card: 'var(--shadow-card)',
				'date-field-focus': 'var(--shadow-date-field-focus)'
			},
			borderWidth: {
				6: '6px'
			},
			borderRadius: {
				card: '16px',
				'card-lg': '20px',
				'card-sm': '10px',
				input: '9px',
				button: '5px',
				'5px': '5px',
				'9px': '9px',
				'10px': '10px',
				'15px': '15px'
			},
			height: {
				input: '3rem',
				'input-sm': '2.5rem'
			},
			opacity: {
				8: '0.08'
			},
			scale: {
				80: '.80',
				98: '.98',
				99: '.99'
			}
		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--bits-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--bits-accordion-content-height)' },
				to: { height: '0' }
			},
			'caret-blink': {
				'0%,70%,100%': { opacity: '1' },
				'20%,50%': { opacity: '0' }
			},
			fadeIn: {
				from: { opacity: '0' },
				to: { opacity: '1' }
			},
			fadeOut: {
				from: { opacity: '1' },
				to: { opacity: '0' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'caret-blink': 'caret-blink 1.25s ease-out infinite',
			'fade-in-1': 'fadeIn 1s ease-in-out .3s forwards',
			'fade-in-2': 'fadeIn 1s ease-in-out 1.2s forwards'
		}
	},
	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
