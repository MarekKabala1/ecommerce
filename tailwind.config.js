/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'linear-gradient': 'linear-gradient(var(--bg_linearGradient))',
				'light-gradient': 'linear-gradient(var(--bg_lightsGradient))',
			},
		},
	},
	plugins: [],
};
