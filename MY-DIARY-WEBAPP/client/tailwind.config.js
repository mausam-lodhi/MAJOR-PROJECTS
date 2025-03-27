/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", // Add your paths here
	],
	theme: {
		extend: {
			colors: {
				azure: "#007FFF",
				lavender: "#E6E6FA",
				aliceblue: "#F0F8FF",
			},
		},
	},
	plugins: [],
};
