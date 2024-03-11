import test from 'ava';
import * as core from '../src/index.js';

test( 'core is an empty import', ( t ) => {
	t.is ( Object.keys( core ).length, 0 );
} );
