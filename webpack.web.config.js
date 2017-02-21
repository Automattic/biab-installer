/**
 * External dependencies
 */

const path = require( 'path' );
const merge = require( 'webpack-merge' );
const shared = require( './webpack.shared.config' );
const webpack = require( 'webpack' );
const BabiliPlugin = require( 'babili-webpack-plugin' );

const config = merge( shared, {
	entry: [
		path.join( __dirname, 'src', 'index.js' )
	],
	output: {
		path: path.join( __dirname, 'app' ),
		filename: 'web.js'
	},
	target: 'electron',
	plugins: [
//		new BabiliPlugin( { removeConsole: true, removeDebugger: true, numericLiterals: false } ),
		new webpack.LoaderOptionsPlugin( { minimize: true } ),
	],
	node: {
		__dirname: false,
		__filename: false,
	},
} );

module.exports = config;
