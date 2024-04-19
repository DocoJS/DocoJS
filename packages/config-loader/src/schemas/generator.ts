import zod from 'zod';

export const generatorSchema = zod.object( {
	generate: zod.function().returns( zod.promise( zod.void() ) )
} );
