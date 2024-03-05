import test from 'ava';
import parse from '../src/index.js';

test( 'parse() is a function', ( t ) => {
	t.is( typeof parse, 'function' );
} );
