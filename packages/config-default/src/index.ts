import { ProjectConfig } from '@docojs/core';
import defaultTheme from '@docojs/theme-default';

const config: ProjectConfig = {
	name: 'Untitled project',
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
		async generator() {},
		theme: defaultTheme
	}
};

export default config;
