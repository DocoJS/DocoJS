import zod from 'zod';

export const nodeTypeSchema = zod.enum( [
	'property'
] );
export const nodeSchema = zod.object( {
	name: zod.string(),
	type: nodeTypeSchema
} );
