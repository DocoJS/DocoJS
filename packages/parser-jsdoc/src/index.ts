import { JSDocResult, explain } from 'jsdoc-api';

export default async function parse( files: Array<string> ): Promise<JSDocResult> {
	return explain( {
		files,
		access: 'all',
		destination: 'console',
		recurse: true
	} );
}
