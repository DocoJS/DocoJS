import { Config } from '@docojs/core';
import defaultTheme from '@docojs/theme-default';

const config: Config = {
	plugins: [],
	parsers: [],
	input: {
		packages: [ '.' ],
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
};

export default config;
