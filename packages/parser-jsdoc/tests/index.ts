import test from 'ava';
import parser from '../src/index.js';

test( 'parser is a function', ( t ) => {
	t.is( typeof parser, 'function' );
} );
