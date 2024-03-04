declare module 'jsdoc-api' {
	export type JSDocDocletMetaCode = {
		id: string;
		name: string;
		type: string;
	} & Record<string, unknown>;

	export interface JSDocDocletMeta {
		filename: string;
		path: string;
		range: [ number, number ];
		lineno: number;
		columnno: number;
		code: JSDocDocletMetaCode;
	}

	export interface JSDocFnParam {
		name: string;
		type: unknown;
		description: string;
	}

	export interface JSDocDocletFunction {
		kind: 'function';
		name: string;
		longname: string;
		scope: string;
		description?: string;
		params: Array<JSDocFnParam>;
	}

	export interface JSDocDocletPackage {
		kind: 'package';
		longname: string;
		files: Array<string>;
	}

	export type JSDocDoclet = {
		comment: string;
		meta: JSDocDocletMeta;
		undocumented?: boolean;
	} & ( JSDocDocletFunction | JSDocDocletPackage );

	export interface JSDocOptions {
		files: Array<string>;
		access: 'all';
		destination: 'console';
		recurse: boolean;
	}

	export type JSDocResult = Array<JSDocDoclet>;

	export function explain( options: JSDocOptions ): Promise<JSDocResult>;
}
