import { Theme } from './Theme.js';

export interface Generator {
	generate: ( inputDirPath: string, outputDirPath: string, theme: Theme ) => Promise<void>;
}
