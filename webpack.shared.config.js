/**
 * External dependencies
 */

const path = require( 'path' );

class IndexHtmlPlugin {
	apply( compiler ) {
		compiler.plugin( 'emit', ( compilation, callback ) => {
			const script = Object.keys( compilation.assets ).find( name => /\.js($|\?)/.test( name ) );
			const html = [
				'<!DOCTYPE html>',
				'<html>',
				'<head>',
				'\t<meta name="viewport" content="width=device-width, initial-scale=1">',
				'\t<meta charset="UTF-8">',
				'\t<title>Blog In A Box</title>',
				'</head>',
				'<body>',
				'\t<div id="app"></div>',
				script ? `\t<script type="text/javascript" src="${ script }"></script>` : '',
				'</body>',
				'</html>',
				'',
			].join( '\n' );

			compilation.assets[ 'index.html' ] = {
				source: () => html,
				size: () => html.length,
			};

			callback();
		} );
	}
}

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
		new IndexHtmlPlugin(),
	],
	context: __dirname,
	resolve: {
		extensions: [ '.js', '.jsx', '.json', '.scss', '.css' ],
		modules: [ path.resolve( __dirname, 'src' ), path.resolve( __dirname, 'app' ), 'node_modules' ],
	},
};

module.exports = config;
