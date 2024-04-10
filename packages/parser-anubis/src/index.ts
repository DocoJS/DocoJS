import { readFile } from 'node:fs/promises';
import ts from 'typescript';

export default async function parse( files: Array<string> ): Promise<Array<ts.SourceFile>> {
	const fileContents = await readFiles( files );
	const sourceFiles = fileContents.map( ( content: string, i: number ) => {
		const fileName = files[ i ]!;

		return ts.createSourceFile( fileName, content, ts.ScriptTarget.Latest, true );
	} );

	return sourceFiles;
}

async function readFiles( files: Array<string> ): Promise<Array<string>> {
	const readPromises = files.map( ( filePath ) => {
		return readFile( filePath, 'utf-8' );
	} );

	return Promise.all( readPromises );
}
