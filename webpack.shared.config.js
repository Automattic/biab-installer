/**
 * External dependencies
 */

const path = require( 'path' );
const webpack = require( 'webpack' );
const cssnext = require( 'postcss-cssnext' );
const postcssFocus = require( 'postcss-focus' );
const postcssReporter = require( 'postcss-reporter' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const config = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [ 'babel-loader?cacheDirectory' ],
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			title: 'Blog In A Box',
			template: path.join( 'src', 'index.ejs' ),
			hash: true,
		} ),
		new webpack.LoaderOptionsPlugin( {
			options: {
				postcss: [
					postcssFocus(),
					cssnext( {
						browsers: [ 'last 2 versions', 'IE > 10' ],
					} ),
					postcssReporter( {
						clearMessages: true
					} ),
				]
			}
		} ),
	],
	context: __dirname,
	resolve: {
		extensions: [ '.js', '.jsx', '.json', '.scss', '.css' ],
		modules: [ path.resolve( __dirname, 'src' ), path.resolve( __dirname, 'app' ), 'node_modules' ],
	},
};

module.exports = config;
