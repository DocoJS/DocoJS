/* eslint-disable no-await-in-loop */

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve as resolvePath } from 'node:path';
import { cwd } from 'node:process';

const packagesPath = resolvePath( cwd(), 'packages' );
const packages = await readdir( packagesPath );
let table = `| Package | npm version |
| ----- | ---- |`;

for ( const packageName of packages ) {
	const packagePath = resolvePath( packagesPath, packageName );
	const packageJSONPath = resolvePath( packagePath, 'package.json' );
	const { default: packageJSON } = await import( packageJSONPath, {
		with: {
			type: 'json'
		}
	} );
	const npmName = packageJSON.name;

	table += `\n| [\`${ npmName }\`](https://github.com/Comandeer/DocoJS/tree/main/packages/${ packageName }) |`;
	table += ` [![npm (scoped)](https://img.shields.io/npm/v/${ npmName }.svg)](https://npmjs.com/package/${ npmName }) |`;
}

const readmePath = resolvePath( cwd(), 'README.md' );
const readmeContent = await readFile( readmePath, 'utf-8' );
const newReadmeContent = readmeContent.replace( /(<!--packages:start-->\n).+(\n<!--packages:end-->)/gs, `$1${ table }$2` );

await writeFile( readmePath, newReadmeContent, 'utf-8' );
