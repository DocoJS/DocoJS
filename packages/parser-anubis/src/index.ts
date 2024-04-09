import ts from 'typescript';

export default async function parse(): Promise<ts.SourceFile> {
	const code = 'console.log( \'Hello, world!\' );';
	const compilerHost: ts.CompilerHost = {
		fileExists: () => {
			return true;
		},
		getCanonicalFileName: ( filename ) => {
			return filename;
		},
		getCurrentDirectory: () => {
			return '';
		},
		getDefaultLibFileName: () => {
			return 'lib.d.ts';
		},
		getNewLine: () => {
			return '\n';
		},
		getSourceFile: ( filename ) => {
			return ts.createSourceFile( filename, code, ts.ScriptTarget.Latest, true );
		},
		readFile: () => {
			return undefined;
		},
		useCaseSensitiveFileNames: () => {
			return true;
		},
		writeFile: () => {
			return null;
		}
	};
	const fileName = 'test.mts';
	const program = ts.createProgram( [
		fileName
	], {
		noResolve: true,
		target: ts.ScriptTarget.Latest
	}, compilerHost );
	const sourceFile = program.getSourceFile( fileName )!;

	return sourceFile;
}
