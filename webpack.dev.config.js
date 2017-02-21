/**
 * External dependencies
 */

const path = require( 'path' );
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const shared = require( './webpack.shared.config' );

const config = merge( shared, {
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://0.0.0.0:3312',
		'webpack/hot/only-dev-server',
		path.join( __dirname, 'src', 'index.js' )
	],
	output: {
		path: path.join( __dirname, 'app' ),
		filename: 'dev.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	target: 'electron',
	node: {
		__dirname: true,
		__filename: true,
	},
	devServer: {
		historyApiFallback: {
			index: '/'
		},
		hot: true,
		stats: {
			colors: true,
			hash: false,
			version: true,
			timings: true,
			assets: true,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: false,
			publicPath: false
		}
	}
} );

module.exports = config;
