import test from 'ava';
import theme from '../src/index.js';

test( 'config is an object', ( t ) => {
	t.is( typeof theme, 'object' );
} );
