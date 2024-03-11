import { Config } from '@docojs/core';
import { AnyZodObject, ZodDefault } from 'zod';

// https://github.com/colinhacks/zod/discussions/1953#discussioncomment-4811588
export function getDefaultConfig<Schema extends AnyZodObject>( schema: Schema ): Config {
	const defaultConfigValues = Object.entries( schema.shape ).map( ( [ key, value ] ) => {
		if ( value instanceof ZodDefault ) {
			return [ key, value._def.defaultValue() ];
		}

		return [ key, undefined ];
	} );

	return Object.fromEntries( defaultConfigValues ) as Config;
}
