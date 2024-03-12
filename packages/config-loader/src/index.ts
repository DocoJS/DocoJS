import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import defaultConfig from '@docojs/config-default';
import { Config } from '@docojs/core';
import { globby } from 'globby';
import merge from 'lodash.merge';
import { configSchema } from './configSchema.js';

export default async function loadConfig( root: string ): Promise<Config> {
	const files = await globby( 'doco.config.{js,mjs}', {
		cwd: root,
		absolute: true
	} );

	if ( files.length === 0 ) {
		return defaultConfig;
	}

	const configPath = files[ 0 ];

	assert( configPath, 'Configuration file path is defined' );

	const configUrl = pathToFileURL( configPath );
	const config = await import( configUrl.href );
	const resolvedConfig = merge( {}, defaultConfig, config.default );
	const parsedConfig: Config = configSchema.parse( resolvedConfig );

	return parsedConfig;
}
