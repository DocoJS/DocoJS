import { Command } from 'commander';

export default function cli(): Command {
	const program = new Command();

	program.
		name( 'doco' ).
		description( 'Documentation generator for JS & TS projects' ).
		version( '0.0.0.' );

	return program;
}
