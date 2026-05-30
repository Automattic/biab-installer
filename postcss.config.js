module.exports = {
	plugins: [
		require( 'postcss-focus' )(),
		require( 'postcss-cssnext' )( {
			browsers: [ 'last 2 versions', 'IE > 10' ],
		} ),
		require( 'postcss-reporter' )( {
			clearMessages: true,
		} ),
	],
};
