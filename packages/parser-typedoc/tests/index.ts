import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';
import test from 'ava';
import parse from '../src/index.js';
import { ProjectReflection } from 'typedoc';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const tsconfigPath = resolvePath( __dirname, '__fixtures__', 'tsconfig.json' );

test( 'parse() is a function', ( t ) => {
	t.is( typeof parse, 'function' );
} );

test( 'parse() returns annotated AST', async ( t ) => {
	const ast = await parse( [
		getFixturePath( '1-function' )
	], tsconfigPath );

	t.true( ast instanceof ProjectReflection );
} );

function getFixturePath( filename: string ): string {
	return resolvePath( __dirname, '__fixtures__', `${ filename }.ts` );
}
