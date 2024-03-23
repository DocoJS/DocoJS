import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
import test from 'ava';
import defaultConfig from '@docojs/config-default';
import { ProjectConfig } from '@docojs/core';
import loadConfig from '../src/index.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const fixtureDirPath = resolvePath( __dirname, '__fixtures__' );
const fixtures = {
	withoutConfigFile: {
		cwd: resolvePath( fixtureDirPath, 'without-config-file' )
	},
	basic: {
		cwd: resolvePath( fixtureDirPath, 'basic' )
	},
	mjs: {
		cwd: resolvePath( fixtureDirPath, 'mjs' )
	},
	mutliple: {
		cwd: resolvePath( fixtureDirPath, 'multiple' )
	},
	ancestor: {
		cwd: resolvePath( fixtureDirPath, 'ancestor', 'child', 'grandchild' ),
		projectRoot: resolvePath( fixtureDirPath, 'ancestor' )
	}
} as const;
const customConfig: ProjectConfig = {
	...defaultConfig,
	name: 'test',
	output: {
		...defaultConfig.output,
		dir: './dist'
	}
};

test( 'loadConfig() is a function', ( t ) => {
	t.is( typeof loadConfig, 'function' );
} );

test( 'loadConfig() returns configuration from doco.config.js file in the provided root directory', async ( t ) => {
	const config = await loadConfig( fixtures.basic.cwd, { defaultConfig } );

	t.deepEqual( config, customConfig );
} );

test( 'loadConfig() returns configuration from doco.config.mjs file in the provided root directory', async ( t ) => {
	const config = await loadConfig( fixtures.mjs.cwd, { defaultConfig } );

	t.deepEqual( config, customConfig );
} );

test( 'loadConfig() prefers doco.config.js over doco.config.mjs', async ( t ) => {
	const config = await loadConfig( fixtures.mutliple.cwd, { defaultConfig } );

	t.deepEqual( config, customConfig );
} );

test( 'loadConfig() returns undefined when config file ' +
	'is not present in the provided root directory', async ( t ) => {
	const config = await loadConfig( fixtures.withoutConfigFile.cwd );

	t.is( config, undefined );
} );

test( 'loadConfig() returns default configuration when config file ' +
	'is not present in the provided root directory and the default config is provided', async ( t ) => {
	const config = await loadConfig( fixtures.withoutConfigFile.cwd, { defaultConfig } );

	t.deepEqual( config, defaultConfig );
} );

test( 'loadConfig() returns config from the doco.config.js files in the ancestor directory', async ( t ) => {
	const config = await loadConfig( fixtures.ancestor.cwd, {
		projectRoot: fixtures.ancestor.projectRoot,
		defaultConfig
	} );

	t.deepEqual( config, customConfig );
} );
