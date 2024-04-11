import { Node } from './Node.js';

export type Parser = ( files: Array<string> ) => Promise<Array<Node>>;
