import zod from 'zod';

const parserSchema = zod.object( {
	files: zod.array( zod.string() ),
	exclude: zod.array( zod.string() ),
	// TODO: get schema from Parser interface (ts-to-zod?)
	parser: zod.function().returns( zod.promise( zod.unknown() ) )
} );
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
const themeSchema = zod.object( {
	layouts: zod.record( zod.string() )
} );
const generatorSchema = zod.function().returns( zod.promise( zod.void() ) );
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
