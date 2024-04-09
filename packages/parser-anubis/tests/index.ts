import test from 'ava';
import parse from '../src/index.js';

test( 'parse() is a function', ( t ) => {
	t.is( typeof parse, 'function' );
} );

test( 'parse() returns TS source file', async ( t ) => {
	const result = await parse();

	t.true( 'statements' in result );
} );
