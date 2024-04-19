import { Node } from './Node.js';

export interface Parser {
	parse: ( files: ReadonlyArray<string> ) => Promise<Array<Node>>;
}
