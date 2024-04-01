import { Theme } from './Theme.js';

export type Generator = ( inputDirPath: string, outputDirPath: string, theme: Theme ) => Promise<void>;
