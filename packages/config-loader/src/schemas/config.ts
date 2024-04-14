import zod from 'zod';
import { generatorSchema } from './generator.js';
import { themeSchema } from './theme.js';
import { parserSchema } from './parser.js';

const projectInputSchema = zod.object( {
	packages: zod.array( zod.string() ),
	exclude: zod.array( zod.string() )
} );
const packageInputSchema = zod.object( {
	files: zod.array( zod.string() ),
	exclude: zod.array( zod.string() )
} );
const inputSchema = zod.union( [
	projectInputSchema,
	packageInputSchema
] );
const outputSchema = zod.object( {
	dir: zod.string(),
	// TODO: get schema from Generator interface (ts-to-zod?)
	generator: generatorSchema,
	// TODO: get schema from Theme interface (ts-to-zod?)
	theme: themeSchema
} );
const projectConfigSchema = zod.object( {
	name: zod.string().min( 1 ),
	plugins: zod.array( zod.object( {} ) ),
	parsers: zod.array( parserSchema ),
	input: inputSchema,
	output: outputSchema
} );
const packageConfigSchema = zod.object( {
	name: zod.string().min( 1 ),
	input: packageInputSchema
} );
const multipProjectConfigSchema = zod.object( {
	name: zod.string().min( 1 ),
	projects: zod.array( zod.string().min( 1 ) ),
	plugins: zod.array( zod.object( {} ) ),
	output: outputSchema
} );

export const configSchema = zod.union( [
	projectConfigSchema,
	packageConfigSchema,
	multipProjectConfigSchema
] );
