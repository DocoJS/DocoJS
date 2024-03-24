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

interface ConfigModule {
	default: Config;
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
			return defaultConfig === undefined ? undefined : addFallbackNameToConfig( cwd, defaultConfig );
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
	const { default: config }: ConfigModule = await import( configUrl.href );
	const configWithName = await addFallbackNameToConfig( cwd, config );
	const resolvedConfig = merge( {}, defaultConfig, configWithName );

	const parsedConfig: Config = configSchema.parse( resolvedConfig );

	return parsedConfig;
}

interface PackageJSON {
	name: string;
}

interface PackageJSONModule {
	default: PackageJSON;
}

async function addFallbackNameToConfig( cwd: string, config: Partial<Config> ): Promise<Config> {
	if ( config.name !== undefined ) {
		return config as Config;
	}

	try {
		const packageJSONPath = resolvePath( cwd, 'package.json' );
		const { default: packageJSON }: PackageJSONModule = await import( packageJSONPath, {
			with: {
				type: 'json'
			}
		} );

		return merge( {}, config as Config, {
			name: packageJSON.name
		} );
	} catch {
		return config as Config;
	}
}
