import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
import test from 'ava';
import parse from '../src/index.js';

const __dirname = dirname( fileURLToPath( import.meta.url ) );

test( 'parse() is a function', ( t ) => {
	t.is( typeof parse, 'function' );
} );

test( 'parse() returns annotated AST', async ( t ) => {
	const ast = await parse( [
		getFixturePath( '1-function' )
	] );

	t.true( Array.isArray( ast ) );
} );

function getFixturePath( filename: string ): string {
	return resolvePath( __dirname, 'fixtures', `${ filename }.js` );
}
