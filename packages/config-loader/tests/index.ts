import test from 'ava';
import loadConfig from '../src/index.js';

test( 'loadConfig() is a function', ( t ) => {
	t.is( typeof loadConfig, 'function' );
} );
