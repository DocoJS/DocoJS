#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program.
	name( 'doco' ).
	description( 'Documentation generator for JS & TS projects' ).
	version( '0.0.0.' ).
	parse();
