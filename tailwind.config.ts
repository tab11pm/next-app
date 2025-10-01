import type { Config } from 'tailwindcss'

export default {
	darkMode: 'class',
	content: ['./src/app/**/*.{ts,tsx,md,mdx}', './src/components/**/*.{ts,tsx}'],
	theme: {
		extend: {
			container: { center: true, padding: '1rem' },
			colors: {
				brand: {
					50: '#eef6ff',
					100: '#d9eaff',
					500: '#2563eb',
					600: '#1d4ed8',
					900: '#0b1a4a',
				},
			},
			keyframes: {
				'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(.96)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(4px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-in': 'fade-in .2s ease-out both',
				'scale-in': 'scale-in .18s ease-out both',
				'slide-up': 'slide-up .18s ease-out both',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
} satisfies Config
