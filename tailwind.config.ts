import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				xs: "480px",
				lg: "1000px",
				xl: "1190px",
			},
			colors: {
				primary: "#1565D8",
				dark: {
					light: "#5A7184",
					hard: "#0D2436",
					soft: "#183B56",
				},
			},
			fontFamily: {
				opensans: ["'Open Sans'", "sans-serif"],
				roboto: ["'Roboto'", "sans-serif"],
			},
		},
	},
	plugins: [],
};
export default config;
