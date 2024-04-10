import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'ava';
import parse from '../src/index.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );

test( 'parse() is a function', ( t ) => {
	t.is( typeof parse, 'function' );
} );

test( 'parse() returns array of TS source file for the given files', async ( t ) => {
	const fixturePaths = [
		getFixturePath( '1-hello-world' ),
		getFixturePath( '2-simple-export' )
	];
	const result = await parse( fixturePaths );

	t.is( result.length, 2 );

	for ( const file of result ) {
		t.true( 'statements' in file );
	}
} );

function getFixturePath( filename: string, extension = 'ts' ): string {
	return resolvePath( __dirname, '__fixtures__', `${ filename }.${ extension }` );
}
