import { ProjectConfig } from '@docojs/core';
import defaultTheme from '@docojs/theme-default';

const config = {
	plugins: [],
	parsers: [],
	input: {
		files: [
			'./README.md',
			'./src/**/*.{js,ts,cjs,cts,mjs,mts,md}'
		],
		exclude: []
	},
	output: {
		dir: './docs',
		renderer: {},
		theme: defaultTheme
	}
} as unknown as ProjectConfig;

export default config;
