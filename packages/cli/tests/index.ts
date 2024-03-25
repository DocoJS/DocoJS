import test from 'ava';
import cli from '../src/index.js';

test( 'cli() is a function', ( t ) => {
	t.is( typeof cli, 'function' );
} );
