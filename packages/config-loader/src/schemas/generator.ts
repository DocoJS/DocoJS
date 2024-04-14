import zod from 'zod';

export const generatorSchema = zod.function().returns( zod.promise( zod.void() ) );
