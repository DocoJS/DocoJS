export type NodeType = 'property';

export interface Node {
	readonly name: string;
	readonly type: NodeType;
}
