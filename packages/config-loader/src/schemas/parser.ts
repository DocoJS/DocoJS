import zod from 'zod';
import { nodeSchema } from './node.js';

export const parserSchema = zod.object( {
	files: zod.array( zod.string() ),
	exclude: zod.array( zod.string() ),
	// TODO: get schema from Parser interface (ts-to-zod?)
	parser: zod.object( {
		parse: zod.function().returns( zod.promise( zod.array( nodeSchema ) ) )
	} )
} );
