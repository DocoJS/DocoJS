import test from 'ava';
import doco from '../src/index.js';

test( 'doco is a function', ( t ) => {
	t.is( typeof doco, 'function' );
} );
