import assert from 'node:assert/strict';
import { cp, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve as resolvePath } from 'node:path';
import { argv, cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';

const monorepoRoot = cwd();
const __dirname = dirname( fileURLToPath( import.meta.url ) );
const templatePath = resolvePath( __dirname, 'template' );
const packageName = argv[ 2 ];

assert( packageName, 'Please provide a package name' );

const packagePath = resolvePath( monorepoRoot, 'packages', packageName );

await cp( templatePath, packagePath, {
	recursive: true
} );

const packageJsonPath = resolvePath( packagePath, 'package.json' );
const changelogPath = resolvePath( packagePath, 'CHANGELOG.md' );
const readmePath = resolvePath( packagePath, 'README.md' );

await Promise.all( [
	updateProjectName( packageJsonPath, packageName ),
	updateProjectName( changelogPath, packageName ),
	updateProjectName( readmePath, packageName )
] );

const dependencies = [
	'tslib'
];
const devDependencies = [
	'@comandeer/rollup-lib-bundler',
	'ava',
	'c8',
	'tsx',
	'typescript'
];

await execa( 'pnpm', [ 'install', ...dependencies ], {
	stdio: 'inherit',
	cwd: packagePath
} );
await execa( 'pnpm', [ 'install', '-D', ...devDependencies ], {
	stdio: 'inherit',
	cwd: packagePath
} );
await execa( 'pnpm', [ 'dedupe' ], {
	stdio: 'inherit',
	cwd: monorepoRoot
} );

async function updateProjectName( filePath: string, packageName: string ): Promise<void> {
	const fileContent = await readFile( filePath, 'utf-8' );
	const replacedContent = fileContent.replaceAll( '{{PACKAGE_NAME}}', packageName );

	return writeFile( filePath, replacedContent, 'utf-8' );
}
