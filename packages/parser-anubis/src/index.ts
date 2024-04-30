import { readFile } from 'node:fs/promises';
import { Node, Parser } from '@docojs/core';
import ts from 'typescript';

export default class ParserAnubis implements Parser {
	async parse( files: ReadonlyArray<string> ): Promise<Array<Node>> {
		const fileContents = await readFiles( files );
		const sourceFiles = fileContents.map( ( content: string, i: number ) => {
			const fileName = files[ i ]!;

			return ts.createSourceFile( fileName, content, ts.ScriptTarget.Latest, true );
		} );

		return sourceFiles.map( sourceFileToNode );
	}
}

async function readFiles( files: ReadonlyArray<string> ): Promise<Array<string>> {
	const readPromises = files.map( ( filePath ) => {
		return readFile( filePath, 'utf-8' );
	} );

	return Promise.all( readPromises );
}

function sourceFileToNode( sourceFile: ts.SourceFile ): Node {
	return {
		name: 'test',
		type: 'property',
		source: {
			filePath: sourceFile.fileName,
			start: {
				line: 0,
				column: 0
			},
			end: {
				line: 0,
				column: 0
			}
		},
		metadata: {}
	};
}
