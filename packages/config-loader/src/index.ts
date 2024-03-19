import assert from 'node:assert/strict';
import { resolve as resolvePath } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Config } from '@docojs/core';
import { globby } from 'globby';
import merge from 'lodash.merge';
import { configSchema } from './configSchema.js';

interface LoadConfigOptions {
	projectRoot?: string;
	defaultConfig?: Config | undefined;
}

export default async function loadConfig(
	cwd: string,
	{
		projectRoot = cwd,
		defaultConfig
	}: LoadConfigOptions = {}
): Promise<Config | undefined> {
	const files = await globby( 'doco.config.{js,mjs}', {
		cwd,
		absolute: true
	} );

	if ( files.length === 0 ) {
		if ( cwd === projectRoot ) {
			return defaultConfig;
		}

		const parentDir = resolvePath( cwd, '..' );

		return loadConfig( parentDir, {
			projectRoot,
			defaultConfig
		} );
	}

	const configPath = files[ 0 ];

	assert( configPath, 'Configuration file path is defined' );

	const configUrl = pathToFileURL( configPath );
	const config = await import( configUrl.href );
	const resolvedConfig = merge( {}, defaultConfig, config.default );
	const parsedConfig: Config = configSchema.parse( resolvedConfig );

	return parsedConfig;
}
