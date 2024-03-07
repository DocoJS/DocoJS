import { Application, ProjectReflection } from 'typedoc';

export default async function parse( files: Array<string>, tsconfig: string ): Promise<ProjectReflection | undefined> {
	const typeDoc = await Application.bootstrap( {
		excludeExternals: true,
		tsconfig,
		entryPoints: files
	} );

	return typeDoc.convert();
}
