import test from 'ava';
import { configSchema } from '../src/index.js';

test( 'configSchema is exported', ( t ) => {
	t.not( configSchema, undefined );
} );
