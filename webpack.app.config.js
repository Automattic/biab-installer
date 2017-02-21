/**
 * External dependencies
 */

const path = require( 'path' );
const merge = require( 'webpack-merge' );
const shared = require( './webpack.shared.config' );
const pack = require( './app/package.json' );
const externals = Object.keys( pack.dependencies || {} );

const config = merge( shared, {
	entry: [
		path.join( __dirname, 'app', 'index.js' )
	],
	output: {
		path: path.join( __dirname, 'app' ),
		filename: 'app.js',
		libraryTarget: 'commonjs2',
	},
	target: 'electron-main',
	node: {
		__dirname: false,
		__filename: false,
	},
	externals: externals,
} );

module.exports = config;
