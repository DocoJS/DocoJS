import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'ava';
import ParserAnubis from '../src/index.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );

test( 'ParserAnubis is a class', ( t ) => {
	t.is( typeof ParserAnubis, 'function' );
} );

test( 'parse() returns array of Nodes for the given files', async ( t ) => {
	const fixturePaths = [
		getFixturePath( '1-hello-world' ),
		getFixturePath( '2-simple-export' )
	];
	const parser = new ParserAnubis();
	const result = await parser.parse( fixturePaths );

	t.true( Array.isArray( result ) );
	t.is( result.length, 2 );
} );

function getFixturePath( filename: string, extension = 'ts' ): string {
	return resolvePath( __dirname, '__fixtures__', `${ filename }.${ extension }` );
}
