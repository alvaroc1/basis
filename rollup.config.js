import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const tsPlugin = typescript()

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
export default [
	{
		input: 'src/Optional.ts',
		output: [
			{ file: 'dist/Optional.js', format: 'cjs' }
		],
		plugins: [
			tsPlugin,
		]
	},
	{
		input: 'src/Either.ts',
		output: [
			{ file: 'dist/Either.js', format: 'cjs' }
		],
		plugins: [
			tsPlugin,
		]
	},
	{
		input: 'src/Loadable.ts',
		output: [
			{ file: 'dist/Loadable.js', format: 'cjs' }
		],
		plugins: [
			tsPlugin
		]
	}
];
