import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
import test from 'ava';
import loadConfig from '../src/index.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const fixtureDirPath = resolvePath( __dirname, '__fixtures__' );
const fixtures = {
	withoutConfigFile: resolvePath( fixtureDirPath, 'without-config-file' ),
	basic: resolvePath( fixtureDirPath, 'basic' ),
	mjs: resolvePath( fixtureDirPath, 'mjs' ),
	mutliple: resolvePath( fixtureDirPath, 'multiple' )
} as const;

test( 'loadConfig() is a function', ( t ) => {
	t.is( typeof loadConfig, 'function' );
} );

test( 'loadConfig() returns configuration from doco.config.js file in the provided root directory', async ( t ) => {
	const config = await loadConfig( fixtures.basic );

	t.deepEqual( config, { foo: 'bar' } );
} );

test( 'loadConfig() returns configuration from doco.config.mjs file in the provided root directory', async ( t ) => {
	const config = await loadConfig( fixtures.mjs );

	t.deepEqual( config, { foo: 'bar' } );
} );

test( 'loadConfig() prefers doco.config.js over doco.config.mjs', async ( t ) => {
	const config = await loadConfig( fixtures.mutliple );

	t.deepEqual( config, { foo: 'bar' } );
} );

test( 'loadConfig() returns default configuration when config file ' +
	'is not present in the provided root directory', async ( t ) => {
	const config = await loadConfig( fixtures.withoutConfigFile );

	t.deepEqual( config, {} );
} );
