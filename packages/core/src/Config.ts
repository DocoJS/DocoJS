import { Parser } from './Parser.js';
import { Theme } from './Theme.js';

interface Input {
	packages: Array<string>;
	files: Array<string>;
	exclude: Array<string>;
}

interface Output {
	dir: string;
	renderer: Record<string, unknown>;
	theme: Theme;
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
