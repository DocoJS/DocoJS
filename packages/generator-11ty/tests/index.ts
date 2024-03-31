import test from 'ava';
import generator from '../src/index.js';

test( 'generator is a function', ( t ) => {
	t.is( typeof generator, 'function' );
} );
