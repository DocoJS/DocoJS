import { ProjectConfig } from '@docojs/core';
import Generator from '@docojs/generator-11ty';
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
		generator: new Generator(),
		theme: defaultTheme
	}
};

export default config;
