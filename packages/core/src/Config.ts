import { Parser } from './Parser.js';

interface Input {
	packages: Array<string>;
	files: Array<string>;
	exclude: Array<string>;
}

interface Output {
	outDir: string;
	renderer: Record<string, unknown>;
	theme: Record<string, unknown>;
}

interface ParserConfig {
	files: Array<string>;
	exclude: Array<string>;
	parser: Parser;
}

export interface Config {
	input: Input;
	output: Output;
	parsers: Array<ParserConfig>;
	plugins: Array<Record<string, unknown>>;
}
