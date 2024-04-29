export type NodeType = 'property';

export interface NodePosition {
	readonly line: number;
	readonly column: number;
}

export interface NodeSource {
	readonly filePath: string;
	readonly start: NodePosition;
	readonly end: NodePosition;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NodeMetadata {}

export interface Node {
	readonly name: string;
	readonly type: NodeType;
	readonly source: NodeSource;
	readonly metadata: NodeMetadata;
}
