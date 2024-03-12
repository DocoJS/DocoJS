import { Config } from '@docojs/core';

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
		outDir: './docs',
		renderer: {},
		theme: {}
	}
};

export default config;
