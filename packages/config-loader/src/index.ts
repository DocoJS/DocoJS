import assert from 'node:assert/strict';
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

	const config = await import( configPath );

	return config.default;
}
