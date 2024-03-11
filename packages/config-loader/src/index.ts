import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { globby } from 'globby';

export default async function loadConfig( root: string ): Promise<Record<string, unknown>> {
	const files = await globby( 'doco.config.{js,mjs}', {
		cwd: root,
		absolute: true
	} );

	if ( files.length === 0 ) {
		return {};
	}

	const configPath = files[ 0 ];

	assert( configPath, 'Configuration file path is defined' );

	const configUrl = pathToFileURL( configPath );
	const config = await import( configUrl.href );

	return config.default;
}
