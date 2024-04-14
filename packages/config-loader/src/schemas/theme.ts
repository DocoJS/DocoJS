import zod from 'zod';

export const themeSchema = zod.object( {
	layouts: zod.record( zod.string() )
} );
