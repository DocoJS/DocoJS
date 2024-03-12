import test from 'ava';
import config from '../src/index.js';

test( 'config is an object', ( t ) => {
	t.is( typeof config, 'object' );
} );
