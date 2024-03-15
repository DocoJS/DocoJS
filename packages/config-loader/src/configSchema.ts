import zod from 'zod';

const parserSchema = zod.object( {
	files: zod.array( zod.string() ),
	exclude: zod.array( zod.string() ),
	// TODO: get schema from Parser interface (ts-to-zod?)
	parser: zod.instanceof( class {} )
} );
const inputSchema = zod.object( {
	packages: zod.array( zod.string() ),
	files: zod.array( zod.string() ),
	exclude: zod.array( zod.string() )
} );
const themeSchema = zod.object( {
	layouts: zod.record( zod.string() )
} );
const outputSchema = zod.object( {
	dir: zod.string(),
	// TODO: get schema from Renderer interface (ts-to-zod?)
	renderer: zod.object( {} ),
	// TODO: get schema from Theme interface (ts-to-zod?)
	theme: themeSchema
} );

export const configSchema = zod.object( {
	plugins: zod.array( zod.object( {} ) ),
	parsers: zod.array( parserSchema ),
	input: inputSchema,
	output: outputSchema
} );
