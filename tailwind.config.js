/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
// export default {
// 	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
// 	theme: {
// 		extend: {},
// 	},
// 	plugins: [require("@tailwindcss/typography"), require("daisyui")],
// 	daisyui: {
// 		themes: [
// 			{
// 				grownTheme: {
// 					...require("daisyui/src/theming/themes")["light"],
// 					primary: "#00BF63",
// 					secondary: "#65ae46",
// 					accent: "#00BF63",
// 					neutral: "#20567F",
// 				},
// 			},
// 			// "winter",
// 			// "dracula",
// 		],
// 	},
// };

module.exports = withMT({
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			{
				grownTheme: {
					...require("daisyui/src/theming/themes")["light"],
					primary: "#003404",
					secondary: "#52C451",
					accent: "#00BF63",
					neutral: "#20567F",
				},
			},
			// "winter",
			// "dracula",
		],
	},
});
