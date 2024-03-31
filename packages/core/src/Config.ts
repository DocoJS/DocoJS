import { Parser } from './Parser.js';
import { Theme } from './Theme.js';

interface ProjectInput {
	packages: Array<string>;
}

interface PackageInput {
	files: Array<string>;
}

type Input = {
	exclude: Array<string>;
} & ( ProjectInput | PackageInput );

interface Output {
	dir: string;
	generator: Record<string, unknown>;
	theme: Theme;
}

interface ParserConfig {
	files: Array<string>;
	exclude: Array<string>;
	parser: Parser;
}

export interface ProjectConfig {
	name: string;
	input: Input;
	output: Output;
	parsers: Array<ParserConfig>;
	plugins: Array<Record<string, unknown>>;
}

export interface PackageConfig {
	name: string;
	input: PackageInput;
}

export interface MultiProjectConfig {
	name: string;
	projects: Array<string>;
	plugins: Array<Record<string, unknown>>;
	output: Output;
}

export type Config = ProjectConfig | PackageConfig | MultiProjectConfig;
