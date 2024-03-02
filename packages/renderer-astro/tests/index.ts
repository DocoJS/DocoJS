import test from 'ava';
import renderer from '../src/index.js';

test( 'renderer is a function', ( t ) => {
	t.is( typeof renderer, 'function' );
} );
