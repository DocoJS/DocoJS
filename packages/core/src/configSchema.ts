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
const outputSchema = zod.object( {
	outDir: zod.string(),
	// TODO: get schema from Renderer interface (ts-to-zod?)
	renderer: zod.instanceof( class {} ),
	// TODO: get schema from Theme interface (ts-to-zod?)
	theme: zod.object( {} ).default( {} )
} );
const configSchema = zod.object( {
	plugins: zod.array( zod.object( {} ) ).default( [] ),
	parsers: zod.array( parserSchema ).default( [] ),
	input: inputSchema.default( {
		packages: [ '.' ],
		files: [ './README.md', './src/**/*.{js,ts,cjs,cts,mjs,mts,md}' ],
		exclude: []
	} ),
	output: outputSchema.default( {
		outDir: './docs',
		renderer: {},
		theme: {}
	} )
} );

export type Config = zod.infer<typeof configSchema>;

export { configSchema };
